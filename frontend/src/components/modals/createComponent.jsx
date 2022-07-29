// styles
import "./modals.scss"


import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import cookies from 'js-cookie'

// custom imports
import closeButton from '../../images/closeIcon.svg'
import {useTranslation} from "react-i18next";
import {getComponents, goCreateComponent} from "../../redux/actions/componentsAction";
import {useNavigate} from "react-router-dom";
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

export default function CreateComponents({id, addComponent}) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(false)
    const components = useSelector(state => state.componentsReducer.components)
    const language = cookies.get('i18next')


    useEffect(() => {
        dispatch(getComponents())
    }, [])


    const [data, setData] = useState({
        name_am:'',
        name_ru:'',
        name_en:''
    })

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeHandler = event => {
        data[event.target.name] = event.target.value;
        setData(data)
    }

    const createComponentHandler = e => {
        e.preventDefault()
        if (!data.name_am || !data.name_ru || !data.name_en) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
            })
        } else {
            dispatch(goCreateComponent(data))
            handleClose()
        }
    }

    return (
        <div>
            <Button
                className="link" onClick={handleOpen}>+ {t('create_components')}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <div className="container_modal">
                    <form onChange={onChangeHandler} onSubmit={createComponentHandler} id="contact">
                        <h3>{t('create_components')}</h3>
                        <fieldset>
                            <input
                                placeholder="հայերեն անվանում"
                                type="text"
                                name='name_am'
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Русское название"
                                type="text"
                                name='name_ru'
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="English name"
                                type="text"
                                name='name_en'
                                tabIndex="3"
                                required/>
                        </fieldset>

                        <fieldset>
                            <button type="submit" id="contact-submit">
                                Save
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