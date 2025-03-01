import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserState, User } from '../types';

const initialState: Omit<UserState, 'setUsers' | 'setLoading' | 'setError'> = {
    users: [],
    isLoading: false,
    error: null,
};

export const useUserStore = create<UserState>()(
    devtools(
        (set) => ({
            ...initialState,
            setUsers: (users: User[]) => set({ users }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            setError: (error: Error | null) => set({ error }),
        }),
        {
            name: 'user-store',
        }
    )
);

// Selectors for performance
export const useUsers = () => useUserStore((state) => state.users);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useError = () => useUserStore((state) => state.error);
