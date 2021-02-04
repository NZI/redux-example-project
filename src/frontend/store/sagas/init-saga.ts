import { debounce, select, put, delay } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import {pageLoaded } from '../reducers/page-reducer'
import createClient from '../../client'
import UserService from '~/lib/services/UserService'
import { Client } from '~framework/Client'
import { LoadState } from '~/lib/interfaces/LoadState'

function* loadUser() {
    const apiKey = Cookies.get('API_KEY')
    if (!apiKey) {
        return
    }

    const client: Client = yield createClient()
    yield client.Ready()

    const userService = client.get<UserService>('UserService')

    const user = yield userService.getUser(apiKey)

    yield put({
        type: 'USER_LOADED',
        value: user
    })
}

export default function* () {
    yield loadUser()
    yield delay(1000)
    yield put(pageLoaded(LoadState.LOADED))
}