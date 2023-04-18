import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Example from './Navbar'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='h-screen bg-gray-800'>
      <Example/>
      <App/>
    </div>
    
  </React.StrictMode>,
)
