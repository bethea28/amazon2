import axiosInstance from "../apiConfig";
import TransactionType from "../types/transactions";
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

async function getProjectsBackedByUser(userId: string | undefined) {
    try {
        return await axiosInstance.get<Array<TransactionType>>(`/transaction/users/${userId}`)
    } catch (error) {
        throw error;
    }
}


const TransactionService = {
    createTransaction,
    getProjectsBackedByUser
}

export default TransactionService;