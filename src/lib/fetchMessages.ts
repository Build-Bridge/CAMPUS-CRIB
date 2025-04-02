import { axiosConfig } from "../utils/axiosConfig"

export const fetchMessages = async (id: string) => {
    const response = await axiosConfig.get(`chats/conversations?userId=${id}`)
    // console.log("respoonmse", response)
    const messages = response.data.data
    
    return messages
 }