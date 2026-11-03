import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CssBaseline/>
    <App/>
  </AuthProvider>
)
