import { createSlice } from '@reduxjs/toolkit'
import initialState, { PageState } from '../initial-state'

const {
    reducer,
    actions: {
        pageLoaded,
        changeTitle,
        changeThought,
    }
} = createSlice({
    name: 'page',
    initialState: initialState.page,
    reducers: {
        pageLoaded(state: PageState, action): PageState{
            return {
                ...state,
                loading: action.payload
            }
        },
        changeTitle(state: PageState, action): PageState {
            return {
                ...state,
                title: action.payload
            }
        },
        changeThought(state: PageState, action): PageState{
            return {
                ...state,
                thought: action.payload
            }
        },
    },
});

export { pageLoaded, changeTitle, changeThought }

export default reducer