export default interface TransactionType {
    transactionId?: string,
    amount: number,
    userId?: string,
    projectId?: string,
    date?: Date,
    status?: string
}

export interface PaymentInput {
    amount: number
    firstName: string
    lastName: string
    creditNumber: string
    expDate: string
    userId?: string
    projectId?: string
    date?: Date
    status?: string
  }