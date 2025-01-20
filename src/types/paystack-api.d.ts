declare module "paystack-api" {
  interface TransactionInitializeOptions {
    amount: number;
    currency: string;
    email: string;
    reference: string;
    metadata?: Record<string, any>;
    name?: string;
  }

  interface TransactionInitializeResponse {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  }

  interface PaystackClient {
    transaction: {
      initialize(
        options: TransactionInitializeOptions
      ): Promise<TransactionInitializeResponse>;
    };
  }

  export default function (secretKey: string): PaystackClient;
}
