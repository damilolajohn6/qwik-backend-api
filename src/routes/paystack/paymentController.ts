import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/orderSchema.js";
import paystack from "paystack-api";
import crypto from "crypto";

const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// if (!PAYSTACK_SECRET_KEY) {
//   throw new Error("PAYSTACK_SECRET_KEY is not defined");
// }
//@ts-ignore
const paystackClient = paystack(PAYSTACK_SECRET_KEY);

export async function getKeys(req: Request, res: Response) {
  res.json({ publishableKey: PAYSTACK_PUBLIC_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
  try {
    const { orderId, customerEmail } = req.body as {
      orderId: string;
      customerEmail: string;
    };

    if (!customerEmail) {
      return res.status(400).json({ error: "Customer email is required" });
    }

    const orderItems = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.orderId, Number(orderId)));

    if (!orderItems.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const amountInKobo = Math.floor(total * 100);

    const response = await paystackClient.transaction.initialize({
      amount: amountInKobo,
      currency: "NGN",
      reference: `ref_${orderId}`,
      name: "Customer Name",
      email: customerEmail,
      metadata: { order_id: orderId },
    });

    if (response.status) {
      const paymentIntent = response.data;

      // Update order with payment intent ID
      await db
        .update(ordersTable)
        .set({ paystackPaymentIntentId: paymentIntent.reference })
        .where(eq(ordersTable.id, Number(orderId)))
        .execute();

      res.json({
        paymentIntent: paymentIntent.authorization_url,
        publishableKey: PAYSTACK_PUBLIC_KEY,
      });
    } else {
      res.status(500).json({ error: response.message });
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function webhook(req: Request, res: Response) {
  try {
    const rawBody = req.body;
    const paystackSignature = req.headers["x-paystack-signature"];

    if (!PAYSTACK_SECRET_KEY || !verifyWebhookSignature(rawBody, paystackSignature, PAYSTACK_SECRET_KEY)) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = JSON.parse(rawBody);

    if (event.event === "charge.success") {
      const paymentData = event.data;

      // Update order status in database
      await db
        .update(ordersTable)
        .set({ status: "paid" })
        .where(eq(ordersTable.paystackPaymentIntentId, paymentData.reference))
        .execute();

      console.log(`Payment successful! Order ID: ${paymentData.metadata.order_id}`);
    } else {
      console.log(`Unhandled webhook event type: ${event.event}`);
    }

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Utility to verify webhook signature
function verifyWebhookSignature(rawBody: any, signature: any, secretKey: string): boolean {
  const hash = crypto.createHmac("sha512", secretKey).update(rawBody).digest("hex");
  return hash === signature;
}
