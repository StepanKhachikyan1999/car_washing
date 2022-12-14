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
import {goAddTechnician} from "../../redux/actions/addTechnicianAction";
import {goAddEmail, goAddUser} from "../../redux/actions/addUserAction";



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

export default function AddEmail() {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        email: '',
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

    const addEmailHandler = e => {
        e.preventDefault()
        if (!data.email.trim()) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        } else {
            dispatch(goAddEmail(data))
            handleClose()
        }
    }


    return (
        <div className="add_email">
            <Button className="link" onClick={handleOpen}>+ {t('dashboard_table.add_email')}</Button>
            <div><br/><i style={{color:"red",fontSize:"30px"}} className="fa-solid fa-arrow-up-long"></i></div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <div className="container_modal">
                    <form onChange={onChangeHandler} onSubmit={addEmailHandler} id="contact">
                        <h3>{t('dashboard_table.add_email_modal')}</h3>
                        <fieldset>
                            <input
                                placeholder={t('dashboard_table.add_email_modal')}
                                type="email"
                                tabIndex="1"
                                name='email'
                                required
                                autoFocus/>
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