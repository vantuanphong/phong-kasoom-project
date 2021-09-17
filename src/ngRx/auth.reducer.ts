import * as AuthAction from './auth.actions'
import {Auths} from '../models/auth.model'

export type Action =AuthAction.ALL

const initialState: Auths = {
    token: ''
}

export function authReducer(state: Auths = initialState, action: AuthAction.ActionParent) {
    console.log(action.type, state);
    switch (action.type) {
        case AuthAction.SAVE_TOKEN:
            console.log(action.payload);
            state = action.payload
            return state
        case AuthAction.DELETE_TOKEN:
            return initialState
        default:
            return state
    }

}