import { combineReducers } from 'redux'
import page from './page-reducer'
import thought from './thought-reducer'
import contactForm from './contact-form-reducer'

const rootReducer = combineReducers({
    page,
    thought,
    contactForm,
})

export default rootReducer