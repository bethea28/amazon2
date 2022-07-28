export default interface TransactionType {
    transactionId?: string,
    amount: number,
    userId?: string,
    projectId: string,
    date?: Date,
    status?: string
}