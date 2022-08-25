import axiosInstance from "../apiConfig";
import TransactionType from "../types/Transactions";
import { getTheCookie } from "../utils/cookies";

async function createTransaction(transactiondata: TransactionType) {
    try{
       const { data } = await axiosInstance.post<TransactionType>(
        "/transaction", transactiondata, {
            headers: {
                Authorization: `Bearer ${getTheCookie("accessToken")}`
            }
        }
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