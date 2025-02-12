import axios from "axios";

// Function to fetch user data from the Random User API
export const fetchUsers = async (count: number = 10) => {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${count}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};
