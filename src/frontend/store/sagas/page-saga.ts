import { takeLatest, select, delay, put, all } from 'redux-saga/effects'
import { State } from '../initial-state';
import { changeTitle, changeThought } from '../reducers/page-reducer'

function* updateTitle() {
    const title = yield select((state: State) => state.page.title);
    document.title = title
}

function* updateThought() {
    const thoughts = [
        'start thinking...',
        'should i create a website?...',
        'my computer is getting a bit old...',
        'its time to upgrade my internet...',
        'how much does a url cost?...',
        'i should get a new phone...',
    ]

    yield delay(5000)
    let index = 0
    while (true) {
        let thought = thoughts[index % thoughts.length];
        for (let i = thought.length - 1; i >= 0; i--) {
            let parThought = thought.substr(0, i)
            yield (put(changeThought(parThought)))
            yield delay(50)
        }
        index++
        yield delay(1000)
        thought = thoughts[index % thoughts.length];
        for (let i = 0; i <= thought.length; i++) {
            let parThought = thought.substr(0, i)
            yield (put(changeThought(parThought)))
            yield delay(50 + (Math.random() * 150))
        }

        yield delay(5000)
    }
}

export default function* () {
    yield all([
        updateTitle(),
        takeLatest(changeTitle, updateTitle),
        updateThought()
    ])
}