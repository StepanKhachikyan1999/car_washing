// styles
import "./ComponentsAdmin.scss"

import React, {useCallback, useEffect, useState} from 'react';
import cookies from "js-cookie";

// custom imports
import Navbar from "../navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getComponentsIsAdmin} from "../../redux/actions/componentsAction";
import {useTranslation} from "react-i18next";
import CreateComponents from "../modals/createComponent";
import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import EditComponent from "../modals/editComponent";
//import {componentsReducer} from "../../redux/reducers/componentsReducer";



const ComponentsAdmin = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    let language = cookies.get("i18next")


    useEffect(() => {
        dispatch(getComponentsIsAdmin())
    }, [])

    const getAllComponents = useSelector(state => state.componentsReducer.getComponentsIsAdmin)

    const removeComponent = (id) => {
        axios.post(`${API_URI}/total-component/remove`,
            {id:id},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then(function (response) {
                dispatch(getComponentsIsAdmin())
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return (
        <div className="admin_components_section">
            <Navbar />

            <div className="components_slice">
                <div className="components_main">
                    <h5>{t("components")}</h5>
                    <CreateComponents />
                </div>

                <div className="main-container">
                    {/*<div className="search_slice">*/}
                    {/*    <input type="search"*/}
                    {/*           placeholder={t("search")}*/}
                    {/*           onChange={(event) => event.target.value}/>*/}
                    {/*</div>*/}
                    <ul className="grid-wrapper">
                        {
                            getAllComponents && getAllComponents?.map((t) => {
                                return(
                                    <li key={t?.id}>
                                        <div className="btn_slice">
                                            <span><EditComponent id={t?.id} name_en={t?.name_en} name_am={t?.name_am} name_ru={t?.name_ru} /></span>
                                            <span><i onClick={() => removeComponent(t?.id)} className="fa-solid fa-trash-can"></i></span>
                                        </div>
                                        {language === "en" && t?.name_en}
                                        {language === "am" && t?.name_am}
                                        {language === "ru" && t?.name_ru}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ComponentsAdmin;