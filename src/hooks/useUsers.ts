import { useQuery } from "react-query";
import axios from "axios";
import { useUserStore } from "../store/userStore";

// Function to fetch users from API
const fetchUsers = async () => {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    return response.data.results;
};

export const useUsers = () => {
    const setUsers = useUserStore((state) => state.setUsers);

    return useQuery("users", fetchUsers, {
        onSuccess: (data) => setUsers(data),
        staleTime: 60000, // Cache data for 1 minute
    });
};
