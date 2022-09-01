import axiosInstance from "../apiConfig";
import TransactionType from "../types/transactions";
import { getTheCookie } from "../utils/cookies";
import ProjectData from "../types/Project"

/*
* Handling the get request that is made by the client to get a transaction by transactionId
* @param transactionId  A HashKey String in the Authorization of Request Header
* @return               Transaction Object with specified transactionId
*/

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

/*
* Handling the get request that is made by the client to get the projects backed by the user based on the transactions they made
* @param userId      The userId for which are the projects are requested
* @return            List of projects backed by user
*/
async function getProjectsBackedByUser(userId: string | undefined) {
    try {
        return await axiosInstance.get<Array<ProjectData>>(`/transaction/users/${userId}`)
    } catch (error) {
        throw error;
    }
}


const TransactionService = {
    createTransaction,
    getProjectsBackedByUser
}

export default TransactionService;