import axiosInstance from "../apiConfig";
import TransactionType from "../types/transactions";

async function createTransaction(transactiondata: TransactionType) {
    try{
       const { data } = await axiosInstance.post<TransactionType>(
        "http://localhost:8083/transaction",
        transactiondata
       );
       return data;
    }  catch(error) {
        throw "error";
    }
}

const TransactionService = {
    createTransaction
}

export default TransactionService;