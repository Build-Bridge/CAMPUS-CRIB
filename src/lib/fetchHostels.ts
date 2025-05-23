import { CreateHostel } from "../types/Hostel"
import { axiosConfig } from "../utils/axiosConfig"

export const fetchAllHostels = async () => {
   const response = await axiosConfig.get('hostels')
   const allHostels = response.data.data
   return allHostels
}

export const fetchHostelById = async (id: string) => {
    const response = await axiosConfig.get(`hostels/${id}`)
    console.log(response)
    return response.data.data
}

export const createHostel = async (data: CreateHostel) => {
    const response = await axiosConfig.post('/hostels', data)
    console.log(response)
    return response
}