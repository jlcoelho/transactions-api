import { type PrismaClient } from "@prisma/client";
import { type Transaction } from "./transaction";
import { prisma } from "@/main/config/prisma";

export class PrismaBaseRepository {
  private tx: Transaction | null = null;

  transacting(transaction: Transaction | null): void {
    this.tx = transaction;
  }

  /**
   * Unit of Work
   */
  protected get uow(): Transaction | PrismaClient {
    return this.tx ?? prisma;
  }
}
