import React, { Suspense, lazy, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
    Container,
    Box,
    CssBaseline,
    Paper,
    createTheme,
    ThemeProvider,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import { useUsers } from './hooks/useUsers';
import { useThemeStore } from './store/themeStore';

// Lazy-loaded components
const SearchBar = lazy(() => import('./components/SearchBar'));
const CountryFilter = lazy(() => import('./components/CountryFilter'));
const UserList = lazy(() => import('./components/UserList'));
const Statistics = lazy(() => import('./components/Statistics'));

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            suspense: false, // Don't use React Suspense for data fetching
            retry: 3,
        },
    },
});

// Loading fallback
const LoadingFallback = () => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
    >
        <CircularProgress />
    </Box>
);

// Error boundary component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error?: Error }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Something went wrong: {this.state.error?.message || 'Unknown error'}
                </Alert>
            );
        }

        return this.props.children;
    }
}

const AppContent: React.FC = () => {
    const { isLoading, error, refetch } = useUsers(); // Fetch users on mount
    const { darkMode, toggleTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#90caf9' : '#0d47a1',
            },
            background: {
                default: darkMode ? '#121212' : '#ffffff',
            },
        },
    }), [darkMode]);

    if (!mounted) return null;

    if (isLoading) return <LoadingFallback />;

    if (error) return (
        <Alert
            severity="error"
            sx={{ m: 2 }}
            action={
                <Button color="inherit" size="small" onClick={() => refetch()}>
                    Retry
                </Button>
            }
        >
            Error: {error.message}
        </Alert>
    );

    return (
        <ThemeProvider theme={theme}>
            <Button
                onClick={toggleTheme}
                sx={{ position: 'absolute', top: 16, right: 16 }}
            >
                Toggle Theme
            </Button>

            <CssBaseline />
            <Container>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Box>
                        <ErrorBoundary>
                            <Suspense fallback={<CircularProgress />}>
                                <SearchBar />
                            </Suspense>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <Suspense fallback={<CircularProgress />}>
                                <CountryFilter />
                            </Suspense>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <Suspense fallback={<CircularProgress />}>
                                <UserList />
                            </Suspense>
                        </ErrorBoundary>
                    </Box>

                    <Paper
                        elevation={3}
                        sx={{
                            boxShadow: 'none',
                            position: 'sticky',
                            top: 16,
                            p: 2,
                        }}
                    >
                        <ErrorBoundary>
                            <Suspense fallback={<CircularProgress />}>
                                <Statistics />
                            </Suspense>
                        </ErrorBoundary>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <AppContent />
            </ErrorBoundary>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </QueryClientProvider>
    );
};

export default App;
