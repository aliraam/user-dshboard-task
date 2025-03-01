export interface User {
    id: string;
    name: string;
    email: string;
    country: string;
    joinDate: string;
    status: 'active' | 'inactive';
    // Additional fields for UserCard
    picture?: {
        medium: string;
    };
    phone?: string;
}

export interface Theme {
    darkMode: boolean;
    toggleTheme: () => void;
}

export interface FilterState {
    searchQuery: string;
    selectedCountry: string | null;
    setSearchQuery: (query: string) => void;
    setSelectedCountry: (country: string | null) => void;
}

export interface UserState {
    users: User[];
    isLoading: boolean;
    error: Error | null;
    setUsers: (users: User[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
} 