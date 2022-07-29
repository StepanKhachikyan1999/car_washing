import React, {memo, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {API_URI, token} from "../../utils/keys";
import axios from "axios";

const DeviceUserGetCounters = () => {
    const [counters,setCounters] = useState()
    const [counterOnline,setCounterOnline] = useState()
    const {deviceUser} = useParams()
    const {t} = useTranslation()


    let one = `${API_URI}/counter`;
    let two = `${API_URI}/counters/?device_id=${deviceUser}`;

    const requestOne = axios.get(one,{ headers: {'Authorization': `Bearer ${token}`}});
    const requestTwo = axios.get(two,{ headers: {'Authorization': `Bearer ${token}`}});

    useEffect(() => {
        axios
            .all([requestOne,requestTwo])
            .then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    const responseTwo = responses[1]
                    setCounters(responseOne.data.filter(x => x.id == deviceUser)[0])
                    setCounterOnline(responseTwo?.status)
                })
            )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });

    },[0])

    return (
        <>
            <Card sx={{minWidth: 345}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("deviceName")} - {counters?.car_wash_point_name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {t("createAt")} - {counters?.createdAt?.substring(0, 10)}
                                </Typography>
                                {
                                    counterOnline === 200 ?
                                        <div className="online_offline_slice">
                                            <div>Online</div>
                                            <span className="small_ball"></span>
                                        </div>
                                        :  <div className="online_offline_slice">
                                            <div>Offline</div>
                                            <span className="small_ball small_ball_red"></span>
                                        </div>
                                }
                            </CardContent>
            </Card>
        </>
    );
};

export default memo(DeviceUserGetCounters);