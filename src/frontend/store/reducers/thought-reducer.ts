import { createSlice } from '@reduxjs/toolkit'
import { actionChannel } from 'redux-saga/effects'
import initialState, { PageState } from '../initial-state'

const {
    reducer,
    actions: {
        updateThought,
        updateThoughtResults,
        updateThoughtState
    }
} = createSlice({
    name: 'page',
    initialState: initialState.thought,
    reducers: {
        updateThought(state, action) {
            return {
                ...state,
                thought: action.payload
            }
        },
        updateThoughtResults(state, action) {
            console.log(action.payload)
            return {
                ...state,
                thoughts: action.payload,
            }
        },
        updateThoughtState(state, action) {
            return {
                ...state,
                loading: action.payload,
            }
        }
    },
});

export {updateThought, updateThoughtResults, updateThoughtState};

export default reducer;