import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/overpass"; // Defaults to weight 400
import "@fontsource/overpass/400.css"; // Specify weight
import "@fontsource/overpass/400-italic.css"; // Specify weight and style

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
