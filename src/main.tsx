import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import { ThemeProvider } from './darkMode/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/middlewares/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
