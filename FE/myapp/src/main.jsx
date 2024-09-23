import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Provider } from "react-redux"
import { legacy_createStore } from "redux"
import appReducer from './Redux/appReducer.jsx'

const store = legacy_createStore(appReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />

  </Provider>

)
