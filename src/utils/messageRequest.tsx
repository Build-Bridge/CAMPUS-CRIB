import { axiosConfig } from "./axiosConfig"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const messaging = async (data: any) => {
    console.log("post chat", data);
    const  response = await axiosConfig.post('chats/message', data)
    console.log(response)
}