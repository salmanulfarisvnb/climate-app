import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";

import { ThemeProvider } from "./context/theme-provider";
import { LoginForm } from "./components/login-form";
import WeatherDashboard from "./pages/WeatherDashboard";
import NameContext from "./context/NameContext";
const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <NameContext>
            <Layout>
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<WeatherDashboard />} />
              </Routes>
            </Layout>
          </NameContext>
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
export default App;
