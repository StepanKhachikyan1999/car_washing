// styles
import "./modals.scss"
import * as React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

// custom imports
import closeButton from '../../images/closeIcon.svg'
import {useTranslation} from "react-i18next";
import {goEditComponent} from "../../redux/actions/componentsAction";
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

export default function EditComponent({id,name_am,name_ru,name_en}) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        id:id,
        name_am:name_am,
        name_ru:name_ru,
        name_en:name_en
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

    const editComponentHandler = e => {
        e.preventDefault()
        if (!data.name_am || !data.name_ru || !data.name_en) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
            })
        } else {
            dispatch(goEditComponent(data))
            handleClose()
        }
    }

    return (
        <div>
            <Button
                className="link btn_edit" onClick={handleOpen}><i className="fa-solid fa-pen-to-square"></i></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <div className="container_modal">
                    <form onChange={onChangeHandler} onSubmit={editComponentHandler} id="contact">
                        <h3>{t("edit_component")}</h3>
                        <fieldset>
                            <input
                                placeholder="հայերեն անվանում"
                                type="text"
                                defaultValue={name_am}
                                name='name_am'
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="Русское название"
                                type="text"
                                name='name_ru'
                                defaultValue={name_ru}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <input
                                placeholder="English name"
                                type="text"
                                name='name_en'
                                defaultValue={name_en}
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