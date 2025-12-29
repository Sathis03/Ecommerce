import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import { store } from './redux/store'

// Configure Axios
let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
if (apiUrl.endsWith('/')) {
    apiUrl = apiUrl.slice(0, -1);
}
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>,
)
