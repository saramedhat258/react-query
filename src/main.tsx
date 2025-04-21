import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from './components/Info.tsx';
const queryClient = new QueryClient()
const router = createBrowserRouter([{
  children: [
    {
        index: true,
        element: <App/>,
    },
    {
      path: "/info",
      element: <Info />,
    },
  ]
}])

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
    </RouterProvider>
  </QueryClientProvider>

)


