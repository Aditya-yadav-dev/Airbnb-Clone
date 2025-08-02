import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import UserContext from './context/UserContext.jsx'
import ListingContext from './context/ListingContext.jsx'
import BookingContext from './context/BookingContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContext>
      <ListingContext>
        <UserContext>
          <BookingContext>
            <App />
          </BookingContext>
        </UserContext>
      </ListingContext>
    </AuthContext>
  </BrowserRouter>

)
