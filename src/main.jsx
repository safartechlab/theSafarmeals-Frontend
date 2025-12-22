import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import store from './store/store.jsx'
=======
import store from './store/stoer.jsx'
>>>>>>> 436f56ce657c5a46c478a2ba2ebdc09e6312ef8b
import ToastProvider from './store/provider/toastprovider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
