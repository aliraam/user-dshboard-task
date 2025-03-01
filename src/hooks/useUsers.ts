import { useQuery } from "react-query";
import axios from "axios";
import { useCallback } from "react";
import { User } from '../types';
import { useUserStore } from "../store/userStore";

interface RandomUserResponse {
    results: Array<{
        login: { uuid: string };
        name: { first: string; last: string };
        email: string;
        location: {
            country: string;
            state: string;
            city: string;
        };
        registered: { date: string };
        picture: { medium: string };
        phone: string;
    }>;
    info: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
}

// Function to fetch users from API
const fetchUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axios.get<RandomUserResponse>('https://randomuser.me/api/?results=20&seed=abc');

        if (!data.results || !Array.isArray(data.results)) {
            throw new Error('Invalid response format from API');
        }

        return data.results.map(user => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            country: user.location.country,
            joinDate: user.registered.date,
            status: Math.random() > 0.5 ? 'active' : 'inactive',
            picture: { medium: user.picture.medium },
            phone: user.phone
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users. Please try again later.');
    }
};

export const useUsers = () => {
    const setUsers = useUserStore((state) => state.setUsers);
    const setLoading = useUserStore((state) => state.setLoading);
    const setError = useUserStore((state) => state.setError);

    const onSuccess = useCallback((data: User[]) => {
        setUsers(data);
        setLoading(false);
        setError(null);
    }, [setUsers, setLoading, setError]);

    const onError = useCallback((error: Error) => {
        setError(error);
        setLoading(false);
    }, [setError, setLoading]);

    return useQuery<User[], Error>("users", fetchUsers, {
        onSuccess,
        onError,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });
};
