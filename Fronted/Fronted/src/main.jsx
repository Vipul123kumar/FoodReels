import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
createRoot(document.getElementById('root')).render(
 
    <AuthProvider store={store}>
    <App />
  </AuthProvider>
  
)
