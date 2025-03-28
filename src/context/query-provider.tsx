import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// Initialize the QueryClient outside the component to maintain a single instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents unnecessary refetches, enhancing performance
      retry: (failureCount, error) => {
        // Retry failed requests up to twice if the error is a network error
        return failureCount < 2 && error?.message === "Network Error";
      },
      retryDelay: 0, // Set retry delay to 0 for immediate retries
    },
  },
});

export default function QueryProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
