
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

// Create a client
const queryClient = new QueryClient()

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id 'root' in your HTML file.")
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
