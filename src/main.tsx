import 'normalize.css'
import 'nprogress/nprogress.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './styles/antd-override.scss'
import './styles/main.css'
import './styles/reset.css'
import './styles/tailwind.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
