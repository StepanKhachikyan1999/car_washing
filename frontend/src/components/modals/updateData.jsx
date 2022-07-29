// styles
import "./modals.scss"


import * as React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useTranslation} from "react-i18next";

// custom imports
import closeButton from '../../images/closeIcon.svg'
import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function UpdateData() {
    const dispatch = useDispatch()
    const deviceUser = useParams()
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const addUserHandler = e => {
        e.preventDefault()
        axios.get(`${API_URI}/counters`,{params:{device_id:Number(deviceUser.deviceUser)},
            headers:{
                Authorization: `Bearer ${token}`
            }}).then(response => {
            Swal.fire({
                title: `${t('data_updated')}`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            navigate("/loadingPage")
        })
            .catch(e => {
                console.error(e)
            })
    }


    return (
        <div>
            <Button className="link" onClick={handleOpen}>{t("update_data")}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">

                <div className="container_modal">
                    <form onSubmit={addUserHandler} id="contact">
                        <h3>{t("do_you_want_to_update_the_data")}</h3>

                        <fieldset>
                            <button type="submit" id="contact-submit">
                                {t("update_data")}
                            </button>
                        </fieldset>
                        <div onClick={handleClose} className="closeBtn">
                            <img src={closeButton} alt="close icon"/>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}