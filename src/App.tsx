import { BrowserRouter as Router, useRoutes } from "react-router";

import routes from "./routes";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AppRouter = () => {
  const element = useRoutes(routes);
  return element;
};
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-right"
        containerStyle={{ zIndex: "999999999999999", position: "sticky" }}
      />
      <Router>
        <ScrollToTop />
        <AppRouter />
      </Router>
    </QueryClientProvider>
  );
}
