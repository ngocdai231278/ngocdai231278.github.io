import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { CLICK_DOT, NEXT_SLIDE, PREVIOUS_SLIDE } from '../Redux-setup/Action-type'

// ???
const isProduct = process.env.NODE_ENV === 'production'

const initState = {
    num: 1,
    img: "images/slide-1.png"
}

function reducer(state = initState, action) {
    switch (action.type) {
        case CLICK_DOT:
            return { 
                ...state,
                img: `images/slide-${state.num + 1}.png`
            }

        default:
            return state
    }
}

const store = isProduct ? createStore(reducer) : createStore(reducer, composeWithDevTools())

export default store