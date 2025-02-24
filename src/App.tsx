import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/theme-provider";
import { LoginForm } from "./components/login-form";
import ProtectRoute from "./util/ProtectRoute";
import { Toaster } from "./components/ui/sonner";
import WeatherDashboard from "./pages/WeatherDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5m
      gcTime: 10 * 60 * 1000, //10m
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Toaster richColors />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route element={<ProtectRoute />}>
                <Route path="/" element={<WeatherDashboard />} />
              </Route>
            </Routes>
          </Layout>
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;
