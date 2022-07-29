// styles
import "./modals.scss"


import * as React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


// custom imports
import closeButton from '../../images/closeIcon.svg'
import {goCreateDevice} from "../../redux/actions/deviceAction";
import {useTranslation} from "react-i18next";
import {API_URI, token} from "../../utils/keys";


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

export default function Disable({id,disabled}) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    let navigate = useNavigate()
    const params = useParams();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        name: '',
    })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onChangeHandler = event => {
        data[event.target.name] = event.target.value;
        data.car_wash_point_id = params.userId
        setData(data)
    }

    const createDeviceHandler = e => {
        e.preventDefault()
        if (!data.name) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        } else {
            dispatch(goCreateDevice(data))
            handleClose()
            navigate("/loadingPage")
        }
    }

    const turnOffFunction = (e,id) => {
        axios.post(`${API_URI}/car-wash/device/disable`, {
            device_id: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                handleClose()
                navigate('/loadingPage')
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const turnOnFunction = (e,id) => {
        axios.post(`${API_URI}/car-wash/device/enable`, {
            device_id: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {

                handleClose()
                navigate('/loadingPage')
            })

            .catch(function (error) {
                console.error(error);
            });
    }




        return (
            <div>
                <Button className="link" onClick={handleOpen}><i className="fa-solid fa-pen-to-square"></i></Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">

                    <div className="container_modal">
                        <form onChange={onChangeHandler} onSubmit={createDeviceHandler} id="contact">
                            {
                                disabled === false ? <h3>{t("disable")}</h3> : <h3>{t("enable")}</h3>
                            }

                            <fieldset>
                                {
                                    disabled === false ?
                                        <button onClick={(e) => turnOffFunction(e, id)} type="submit"
                                                id="contact-submit">
                                            {t("turnOff")}
                                        </button>
                                        : <button onClick={(e) => turnOnFunction(e, id)} type="submit"
                                                  id="contact-submit">
                                            {t("turnOn")}
                                        </button>
                                }

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