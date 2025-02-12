import { create } from "zustand";

interface User {
    name: { first: string; last: string };
    email: string;
    location: { country: string };
    picture: { medium: string };
    phone: string;
}

interface UserStore {
    users: User[];
    searchTerm: string;
    selectedCountry: string;
    setUsers: (users: User[]) => void;
    setSearchTerm: (term: string) => void;
    setSelectedCountry: (country: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    searchTerm: "",
    selectedCountry: "",
    setUsers: (users) => set({ users }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setSelectedCountry: (country) => set({ selectedCountry: country }),
}));
