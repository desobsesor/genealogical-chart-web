import { ClickToComponent } from 'click-to-react-component'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import { HelperProvider } from '../services/context/HelperContext'
import '../styles/index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelperProvider>
            <ClickToComponent />
            <App />
            <Toaster />
        </HelperProvider>
    </React.StrictMode>
)