import axios from "axios";
import Swal from "sweetalert2";
import {API_URI, myUrl, token} from "../../utils/keys";
import {SIGN_IN_POST, GET_AUTH, GET_SINGLE_DEVICE_USER} from "../types";

export const goSignIn = (data) => {
    return (dispatch) => {
        axios
            .post(`${API_URI}/login`, data)
            .then((res) => {
                if(res.data.success == false) {
                        Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        timer: 1500,
                    })
                    window.location.href = myUrl;
                        return
                }
                dispatch({ type: SIGN_IN_POST, payload: res.data });
                localStorage.setItem("myToken", res.data.token);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    showConfirmButton: false,
                    timer: 3000,
                });
                window.location.href = myUrl;
            })
            .catch((e) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    timer: 1500,
                });
            });
    };
};



export function goLogoutDispatch() {
    return async dispatch => {
       await axios.get(`${API_URI}/logout`,{
            headers: {'Authorization': `Bearer ${token}`}
        })
    }
}
