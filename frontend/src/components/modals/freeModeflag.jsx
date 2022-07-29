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
//import {goAddTechnician} from "../../redux/actions/addTechnicianAction";
import {goAddUser} from "../../redux/actions/addUserAction";
import {goOnFreeMode, goResetCount} from "../../redux/actions/deviceAction";
import {useNavigate, useParams} from "react-router-dom";




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

export default function FreeModeflag() {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const deviceUser = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const onFreeModeHandler = e => {
        e.preventDefault()
        const data = {
            "token":"1970d291-392c-44b6-85cc-21fc313f589d",
            "freeModeflag": [
                {"id": +0,"flag": 0}
            ]
        }

        // data.id = deviceUser.deviceUser
        // data.token = '1970d291-392c-44b6-85cc-21fc313f589d'
        dispatch(goOnFreeMode(data))
        navigate("/loadingPage")

    }


    return (
        <div>
            <Button className="link" onClick={handleOpen}>{t("FreeModeflag")}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">

                <div className="container_modal">
                    <form onSubmit={onFreeModeHandler} id="contact">
                        <h3>{t("onFreeMode")}</h3>
                        <fieldset>
                            <button type="submit" id="contact-submit">
                                {t("turnOn")}
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