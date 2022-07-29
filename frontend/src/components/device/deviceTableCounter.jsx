import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import EditCountsTechincan from "../modals/editCountsTechincan";
import {useDispatch, useSelector} from "react-redux";
import EditCounts from "../modals/editCounts";
import {
    advancedSettingsGet,
    getCounter,
    getDeviceUser,
    getSingleDeviceUser,
    goResetCount,
    goserviceResetConfirm, settingsBasic
} from "../../redux/actions/deviceAction";
import ChangeSettingsBasic from "../modals/changeSettingsBasic";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function DeviceTableCounter() {

    const [singleDevice,setSingleDevice] = useState()
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {deviceId} = useParams()
    const {deviceUser} = useParams()
    const [view, setView] = useState(1)

    // console.log(deviceUser,'oop83')

    // const getDeviceSingleUserCounter = useSelector(state => state.deviceReducer.getSingleDeviceUser?.Counter)
    // const getSettingsBasic = useSelector(state => state.deviceReducer.getSettingsBasic)
    // const getSettingsBasicSchedule = useSelector(state => state.deviceReducer.getSettingsBasicSchedule)
    // const getDeviceSingleUser = useSelector(state => state.deviceReducer.getSingleDeviceUser)


    // console.log(getSettingsBasic,'oop80')
    // console.log(getSettingsBasicSchedule,'oop81')
    // console.log(getDeviceSingleUser,'oop82')

    // useEffect(() => {
    //     getCounter()
    // }, [])
    //
    // useEffect(() => {
    //     dispatch(getDeviceUser(`${deviceUser}`))
    //     dispatch(getSingleDeviceUser(`${deviceUser}`))
    //     dispatch(settingsBasic(`${deviceUser}`))
    //
    // }, [])
    //
    // useEffect(() => {
    //     dispatch(advancedSettingsGet(`${deviceUser}`))
    // },[])


    useEffect(() => {
        const instance = axios.create({
            baseURL: `${API_URI}/auth/me`,
            timeout: 1000,
            headers: {'Authorization': `Bearer ${token}`}
        });

        instance.get(`${API_URI}/car-wash/device/${deviceUser}`,
        )
            .then(response => {
                setSingleDevice(response.data)
            })
            .catch(e => {
                console.error(e)
            })

    },[0])

    // reset counters
    // const resetCountsHandler = e => {
    //     e.preventDefault()
    //     const data = {}
    //     data.id = 0
    //     data.token = '1970d291-392c-44b6-85cc-21fc313f589d'
    //     dispatch(goResetCount(data))
    //     navigate("/loadingPage")
    // }


    // reset settings
    // const serviceResetConfirmHandler = e => {
    //     e.preventDefault()
    //     const data = {}
    //     data.id = getDeviceSingleUser?.id
    //     data.token = '1970d291-392c-44b6-85cc-21fc313f589d'
    //     dispatch(goserviceResetConfirm(data))
    //     // navigate("/loadingPage")
    // }


    return (
        <>
        <TableContainer component={Paper}>
       <div style={{color: "green",fontSize:"18px",fontWeight: "600"}}>{t('counter')}</div>
       <div><EditCountsTechincan singleDevice={singleDevice?.Counter} /></div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: '50%',textAlign:"center"}}>{t('counter_name')}</TableCell>
                        <TableCell style={{width: '50%',textAlign:"center"}}>{t('counter_value')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*billD*/}
                    {/*billT*/}

                        <TableRow>
                            <TableCell component="th" scope="row">
                                billD
                                <br/>
                                {t('billT')}
                            </TableCell>
                            <TableCell align="right">{singleDevice?.Counter?.billD}  <br/> {singleDevice?.Counter?.billT}</TableCell>
                        </TableRow>

                    {/*bonusD*/}
                    {/*bonusT*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            bonusD
                            <br/>
                            {t('bonusT')}
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.bonusD} <br/> {singleDevice?.Counter?.bonusT}</TableCell>
                    </TableRow>


                    {/*cashlessD*/}
                    {/*cashlessT*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            cashlessD
                            <br/>
                            {t('cashlessT')}
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.cashlessD}
                        <br/>
                            {singleDevice?.Counter?.cashlessT}
                        </TableCell>
                    </TableRow>


                    {/*chSpent*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            chSpent
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.chSpent}</TableCell>
                    </TableRow>
                    {/*chTimeFreeMode*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            chTimeFreeMode
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.chTimeFreeMode}</TableCell>
                    </TableRow>
                    {/*chTimePaidMode*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            chTimePaidMode
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.chTimePaidMode}</TableCell>
                    </TableRow>
                    {/*coinD*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            coinD
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.coinD}</TableCell>
                    </TableRow>
                    {/*coinT*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            coinT
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.coinT}</TableCell>
                    </TableRow>
                    {/*createdAt*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            createdAt
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.createdAt.substring(0,10)}</TableCell>
                    </TableRow>
                    {/*device_id*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            device_id
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.device_id}</TableCell>
                    </TableRow>
                    {/*powerOnTime*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            powerOnTime
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.powerOnTime}</TableCell>
                    </TableRow>
                    {/*serviceD*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            serviceD
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.serviceD}</TableCell>
                    </TableRow>
                    {/*serviceT*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            serviceT
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.serviceT}</TableCell>
                    </TableRow>
                    {/*updatedAt*/}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            updatedAt
                        </TableCell>
                        <TableCell align="right">{singleDevice?.Counter?.updatedAt.substring(0,10)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    {/* settings basic*/}

    {/*        {*/}
    {/*            view === 1 && <>*/}
    {/*                <TableContainer component={Paper}>*/}
    {/*                    <div style={{color: "green", fontSize: "18px", fontWeight: "600"}}>{t('basic_settings')}</div>*/}
    {/*                    <Table sx={{minWidth: 650}} aria-label="simple table">*/}
    {/*                        <TableHead>*/}
    {/*                            <TableRow>*/}
    {/*                                <TableCell style={{*/}
    {/*                                    width: '50%',*/}
    {/*                                    textAlign: "center",*/}
    {/*                                    fontSize: "18px"*/}
    {/*                                }}>{t('settings_name')}</TableCell>*/}
    {/*                                <TableCell style={{*/}
    {/*                                    width: '50%',*/}
    {/*                                    textAlign: "center",*/}
    {/*                                    fontSize: "18px"*/}
    {/*                                }}>{t('settings_value')}</TableCell>*/}
    {/*                            </TableRow>*/}
    {/*                        </TableHead>*/}
    {/*                        <TableBody>*/}
    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t("billNom")}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasic?.billNom}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bingoT')} <br /> {t("bingoV")}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasic?.bingoT} <br/> {getSettingsBasic?.bingoV}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bonusP')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasic?.bonusP}</TableCell>*/}
    {/*                            </TableRow>*/}


    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bonusV')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasic?.bonusV}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('coinNom')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasic?.coinNom}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bEnd')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.bEnd}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bPct')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.bPct}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bStart')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.bStart}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('bVal')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.bVal}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('tEnd')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.tEnd}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('tPct')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.tPct}</TableCell>*/}
    {/*                            </TableRow>*/}

    {/*                            <TableRow>*/}
    {/*                                <TableCell component="th" scope="row">{t('tStart')}</TableCell>*/}
    {/*                                <TableCell align="right">{getSettingsBasicSchedule?.tStart}</TableCell>*/}
    {/*                            </TableRow>*/}


    {/*                        </TableBody>*/}
    {/*                    </Table>*/}
    {/*                </TableContainer>*/}
    {/*                <br/><br/>*/}
    {/*                <form onSubmit={serviceResetConfirmHandler}>*/}
    {/*                    <button type="submit" className="reset_counts">{t("reset_settings")}</button>*/}
    {/*                </form>*/}

    {/*                <ChangeSettingsBasic singleDevice={getSettingsBasic}/>*/}

    {/*            </>*/}
    {/*        }*/}
        </>
    );
}