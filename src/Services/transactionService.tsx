import axiosInstance from "../apiConfig";
import TransactionType from "../types/transactions";

async function createTransaction(transactiondata: TransactionType) {
    try{
       const { data } = await axiosInstance.post<TransactionType>(
        "http://localhost:8083/transaction",
        transactiondata
       );
       console.log(JSON.stringify(data, null, 4));
       return data;
    }  catch(error) {
        throw "error";
       /* if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return "An unexpected error has occured";  
        } */
    }
}

const TransactionService = {
    createTransaction
}

export default TransactionService;