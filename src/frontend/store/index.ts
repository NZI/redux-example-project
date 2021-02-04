import {createStore, applyMiddleware} from 'redux'
import rootReducer from "./reducers"
import {composeWithDevTools} from "redux-devtools-extension"
import createSagaMiddleware from 'redux-saga'
import initSaga from "./sagas/init-saga"
import pageSaga from "./sagas/page-saga"
import thoughtSaga from "./sagas/thought-saga"

const sagaMiddleware = createSagaMiddleware()

const composedEnhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
)

const store = createStore(rootReducer, composedEnhancer)

sagaMiddleware.run(initSaga)
sagaMiddleware.run(pageSaga)
sagaMiddleware.run(thoughtSaga)

export default store