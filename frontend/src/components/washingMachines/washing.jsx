// styles
import "./washing.scss"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// custom imports
import AddMachineModal from "../modals/addMachine";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


export default function ActionAreaCard() {
    const [carWash,setCarWash] = useState([])
    const [users,setUsers] = useState([])
    const {t} = useTranslation()

        let one = `${API_URI}/car-wash`;
        let two = `${API_URI}/users`;


        const requestOne = axios.get(one,{ headers: {'Authorization': `Bearer ${token}`}});
        const requestTwo = axios.get(two,{ headers: {'Authorization': `Bearer ${token}`}});

        useEffect(() => {
            axios
                .all([requestOne, requestTwo])
                .then(
                    axios.spread((...responses) => {
                        const responseOne = responses[0];
                        const responseTwo = responses[1];
                        setCarWash(responseOne.data)
                        setUsers(responseTwo.data.users)
                    })
                )
                .catch(errors => {
                    // react on errors.
                    console.error(errors);
                });

        },[0])


    const deleteMachine = async (id) => {
        try {
            await axios.post(`${API_URI}/car-wash/remove`, {
                "car_wash_point_id":id
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (response) {
                    axios.get(`${API_URI}/car-wash`,
                        {headers:{Authorization: `Bearer ${token}`}})
                        .then(function (response) {
                            setCarWash(response.data)
                        })
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        catch (e) {
            console.error(e,'error')
        }
    }

    return (
        <>
            <div className="machines_list">
                {t('sidebar.washingMachines')}
                <button>
                    <AddMachineModal />
                </button>
            </div>

            {
                carWash.map((info) => {
                    return(
                        <Card key={info.id}>
                            <CardActionArea>
                                <h2 className="carwash_username">{info?.username}</h2>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {info?.car_wash_point_name === null ? `${t("not_name")}` : info?.car_wash_point_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary.pink">
                                      user_id -  {info?.user_id}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                                <div className="buttons_carwash">
                                    <button onClick={() => deleteMachine(`${info.id}`)}  className="delete_btn"><i className="fa-solid fa-trash-can"></i>{t('delete')}</button>
                                    <Link email={info?.email} username={info?.username}  to={`/viewMachine/${info.id}`}><button className="edit_btn">{t('view')}</button></Link>
                                </div>
                        </Card>
                    )
                })
            }
        </>
    );
}
