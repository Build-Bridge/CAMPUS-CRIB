import { axiosConfig } from "./axiosConfig"

export const messaging = async (data: any) => {
    const  response = await axiosConfig.post('chats/message', data)
    console.log(response)
}

export const getAllMessages = () => {
    
}