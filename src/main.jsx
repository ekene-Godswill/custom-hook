import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AppContextProvider from './contexts/AppContextProvider';
import PupUpContextProvider from './contexts/PupUpContextProvider.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <PupUpContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </PupUpContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
)
