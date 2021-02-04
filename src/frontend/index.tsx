import ProductService from '~/lib/services/ProductService'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from "./store";
import createClient from './client'

import App from './App'

document.addEventListener('DOMContentLoaded', async () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    )
})