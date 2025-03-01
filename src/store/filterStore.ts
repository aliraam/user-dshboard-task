import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterState } from '../types';

export const useFilterStore = create<FilterState>()(
    persist(
        (set) => ({
            searchQuery: '',
            selectedCountry: null,
            setSearchQuery: (query: string) => set({ searchQuery: query }),
            setSelectedCountry: (country: string | null) => set({ selectedCountry: country }),
        }),
        {
            name: 'filter-storage',
            partialize: (state) => ({ selectedCountry: state.selectedCountry }),
        }
    )
); 