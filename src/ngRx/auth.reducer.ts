import * as AuthAction from './auth.actions'
import {Auths} from '../models/auth.model'

export type Action =AuthAction.ALL

const initialState: Auths = {
    token: ''
}

const newState = (state: any, newData: any) => {
    return Object.assign({}, state, newData)
}

export function authReducer(state: Auths = initialState, action: AuthAction.ActionParent) {
    console.log(action.type, state);
    switch (action.type) {
        case AuthAction.SAVE_TOKEN:
            return newState(state, { token: action.payload })
        case AuthAction.DELETE_TOKEN:
            return initialState
        default:
            return state
    }

}