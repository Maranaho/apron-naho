import { FC, StrictMode } from "react"
import ReactDOM from "react-dom/client" 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRoutes from "./components/AppRoutes/AppRoutes"

const queryClient = new QueryClient()

const Root: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </StrictMode>
)

const rootElement = document.getElementById('app')
const root = ReactDOM.createRoot(rootElement as HTMLElement)
root.render(<Root />)