import { User } from '../types';

// Safely filter users with proper type checking
export const filterUsers = (
    users: User[] = [],
    searchQuery: string = '',
    selectedCountry: string | null = null
): User[] => {
    if (!users || !Array.isArray(users) || !users.length) return [];

    const query = searchQuery?.toLowerCase() || '';

    return users.filter((user) => {
        if (!user) return false;

        // Check if search query matches
        const nameMatch = user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(query);
        const emailMatch = user.email && typeof user.email === 'string' && user.email.toLowerCase().includes(query);
        const matchesSearch = !query || nameMatch || emailMatch;

        // Check if country filter matches
        const matchesCountry = !selectedCountry ||
            (user.country && typeof user.country === 'string' && user.country === selectedCountry);

        return matchesSearch && matchesCountry;
    });
};

// Get unique countries from users
export const getUniqueCountries = (users: User[] = []): string[] => {
    if (!users || !Array.isArray(users) || !users.length) return [];

    const countries = users
        .map(user => user?.country)
        .filter((country): country is string =>
            Boolean(country) && typeof country === 'string');

    return Array.from(new Set(countries)).sort();
};

// Calculate user statistics
export const getUserStatistics = (users: User[] = []) => {
    if (!users.length) return {
        totalUsers: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        countriesCount: 0,
        activePercentage: 0,
    };

    const totalUsers = users.length;
    const activeUsers = users.filter(user => user?.status === 'active').length;
    const countriesCount = new Set(
        users.map(user => user?.country).filter(Boolean)
    ).size;

    return {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        countriesCount,
        activePercentage: totalUsers ? (activeUsers / totalUsers) * 100 : 0,
    };
};

// Format date with proper error handling
export const formatDate = (date: string): string => {
    try {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
}; 