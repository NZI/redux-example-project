import { takeLatest, select, delay, put, all } from 'redux-saga/effects'
import { State } from '../initial-state';
import { updateThought, updateThoughtResults, updateThoughtState } from '../reducers/thought-reducer'
import getClient from '../../client'
import ThoughtService from '~/lib/services/ThoughtService'
import { Client } from '~/framework/Client';
import { LoadState } from '~/lib/interfaces/LoadState';

function* fetchThoughtSearch() {
    yield delay(1000);
    yield put(updateThoughtState(LoadState.LOADING));
    const client: Client = yield getClient()
    const thought = yield select((state: State) => state.thought.thought)
    try {
        const thoughts = yield client.get<ThoughtService>('ThoughtService').think(thought)
        yield put(updateThoughtResults(thoughts));
        yield put(updateThoughtState(LoadState.LOADED));
    } catch (e) {
        yield put(updateThoughtState(LoadState.ERROR));
    }
}

export default function* () {
    yield takeLatest(updateThought, fetchThoughtSearch)
}