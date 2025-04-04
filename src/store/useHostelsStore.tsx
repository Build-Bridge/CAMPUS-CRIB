import { create } from 'zustand';

// Hostel Data Types
interface Hostel {
    _id: string;
    user: string;
    images: string[];
    description: string;
    location: string;
    price: number;
    features: string[];
    availableRooms: number;
    isAvailable: boolean;
    hostelName: string;
    hostelType: "SINGLE_ROOMS" | "SHARED_ROOMS";
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface HostelStore {
    storedHostels: Hostel[];
    setStoredHostels: (hostels: Hostel[]) => void;
    addHostel: (hostel: Hostel) => void;
    updateHostel: (id: string, data: Partial<Hostel>) => void;
    removeHostel: (id: string) => void;
}

// Hostel data Store
export const useHostelStore = create<HostelStore>((set) => ({
    storedHostels: [],
    setStoredHostels: (hostels) => set({ storedHostels: hostels }),
    addHostel: (hostel) =>
        set((state) => ({
            storedHostels: [...state.storedHostels, hostel],
        })),
    updateHostel: (id, data) =>
        set((state) => ({
            storedHostels: state.storedHostels.map((hostel) =>
                hostel._id === id ? { ...hostel, ...data } : hostel
            ),
        })),
    removeHostel: (id) =>
        set((state) => ({
            storedHostels: state.storedHostels.filter((hostel) => hostel._id !== id),
        })),
}));
