import {LoadState} from '~/lib/interfaces/LoadState'
import {Thought} from '~/lib/interfaces/Thought'
import { ThoughtType } from '~/lib/interfaces/ThoughtType'

export interface PageState {
    loading: LoadState,
    title: string,
    thought: string,
}

export interface ContactFormState {
    show: boolean,
    type: ThoughtType,
    name: string,
    email: string,
    phone: string,
    body: string,
}

export interface ThoughtState {
    thought: string,
    loading: LoadState,
    thoughts: Thought[],
}

export interface State {
    page: PageState,
    thought: ThoughtState,
    contactForm: ContactFormState,
}

const initialState: State = {
    page: {
        loading: LoadState.UNSET,
        title: 'Clipboard Limited',
        thought: 'start thinking...',
    },
    thought: {
        thought: '',
        loading: LoadState.UNSET,
        thoughts: [],
    },
    contactForm: {
        show: false,
        type: ThoughtType.INFO,
        name: '',
        email: '',
        body: '',
        phone: '',
    }
}

export default initialState