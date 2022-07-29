import {
    GET_COMPONENTS,
    GET_COUNTER,
    GET_SINGLE_DEVICE,
    GET_COMPONENTS_IS_ADMIN,
} from "../types"


const initialState = {
    components:[],
    getSingleComponent:[],
    getCounter:[],
    getComponentsIsAdmin:[]
}

export const componentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMPONENTS:
            return {
                ...state,
                components:action.payload
            }
        case GET_SINGLE_DEVICE:
            return {
                ...state,
                getSingleComponent:action.payload
            }
        case GET_COUNTER:
            return {
                ...state,
                getCounter:action.payload,
            }
        case GET_COMPONENTS_IS_ADMIN:
            return {
                ...state,
                getComponentsIsAdmin:action.payload
            }
        default:
            return state
    }
}