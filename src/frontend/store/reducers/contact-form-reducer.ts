import { createSlice } from '@reduxjs/toolkit'
import { actionChannel } from 'redux-saga/effects'
import { Thought } from '~/lib/interfaces/Thought';
import initialState, { ContactFormState, PageState } from '../initial-state'

const {
    reducer,
    actions: {
        showContactForm,
        hideContactForm
    }
} = createSlice({
    name: 'page',
    initialState: initialState.contactForm,
    reducers: {
        showContactForm(state, action: {
            type: string,
            payload: Thought
        }): ContactFormState {
            return {
                ...state,
                show: true,
                body: action.payload.value,
                type: action.payload.type,
                name: '',
                email: '',
                phone: '',
            }
        },
        hideContactForm(state, action) {
            return {
                ...state,
                ...initialState.contactForm,
            }
        }
    },
});

export {showContactForm, hideContactForm};

export default reducer;