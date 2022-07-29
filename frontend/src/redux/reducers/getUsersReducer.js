import {CLEAR_FILTRATE_USERS, GET_FILTRATE_USERS, GET_ONE_USER, GET_USERS} from "../types"

const initialState = {
    users:[],
    filtrate:null,
    filLoading:true,
    getOneUser:[]
}

export const getUsers = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                filtrate: action.payload,
                filLoading: true
            }
        case GET_ONE_USER:
            return {
                ...state,
                getOneUser: action.payload,
                filLoading:true
            }
        case GET_FILTRATE_USERS:
            return {
                ...state,
                filtrate: state.users.filter(i=>i.role == action.payload),
                filLoading: false
            }
        case CLEAR_FILTRATE_USERS:
            return {
                ...state,
                filLoading: true,
                filtrate: state.users
            }
        default:
            return state
    }
}