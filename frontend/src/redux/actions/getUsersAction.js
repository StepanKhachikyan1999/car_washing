import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import {GET_USERS, GET_ONE_USER, GET_FILTRATE_USERS, CLEAR_FILTRATE_USERS} from "../types";
// import {hideLoader, showLoader} from "./loaderAction";

export function getUsers() {
    return async dispatch => {
        const response = await axios.get(`${API_URI}/users/`,{
            headers: {'Authorization': `Bearer ${token}`}
        })
        dispatch({
            type: GET_USERS,
            payload: response.data.users
        })
    }
}

export const getFiltrateUsers = (role) => {
    return ({
        type:GET_FILTRATE_USERS,
        payload:role
    })
}

export const getClearFiltrateUsers = () => {
    return ({
        type:CLEAR_FILTRATE_USERS
    })
}


// export function getOneUser() {
//     return async dispatch => {
//         const response = await axios.get(`${API_URI}/auth/me`,
//             {
//                 headers: {'Authorization': `Bearer ${token}`}
//             })
//         dispatch({
//             type: GET_ONE_USER,
//             payload: response.data
//         })
//     }
// }
