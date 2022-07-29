//styles
import "./DeviceUser.scss"

import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/Navbar";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
//mui
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {
    getCounter,
    getDeviceUser,
    getSingleDeviceUser, goflagsfreeMode,
    goResetCount,
    goserviceResetConfirm, settingsBasic,advancedSettingsGet
} from "../../redux/actions/deviceAction";
import EditCounts from "../../components/modals/editCounts";
import FreeMode from "../../components/modals/freeMode";
import UpdateData from "../../components/modals/updateData";
import FreeModeflag from "../../components/modals/freeModeflag";
import ChangeSettingsBasic from "../../components/modals/changeSettingsBasic";
import ChangeExtendedSettings from "../../components/modals/changeExtendedSettings";
import {Preloader} from "react-preloader-icon";
import PagePreLoader from "../../components/PagePreLoader/PagePreLoader";
import DeviceUserGetCounters from "./DeviceUserGetCounters";
import cookies from "js-cookie";

const DeviceUser = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    let language = cookies.get("i18next")
    const navigate = useNavigate()
    const {deviceUser} = useParams()
    // const [stop, setStop] = useState(false)
    const [view, setView] = useState(1)
    const [storageRole,setStorageRole] = useState(false)


    const getDeviceUserComponents = useSelector(state => state.deviceReducer.getDeviceUser)
    const getDeviceSingleUserCounter = useSelector(state => state.deviceReducer.getSingleDeviceUser?.Counter)
    const getDeviceSingleUser = useSelector(state => state.deviceReducer.getSingleDeviceUser)
    const getDeviceSingleUserSettings = useSelector(state => state.deviceReducer.getSingleDeviceUser?.DeviceSetting)
    // const getCounterData =  useSelector(state => state.deviceReducer.getCounter)
    const getSettingsBasic = useSelector(state => state.deviceReducer.getSettingsBasic)
    const getSettingsBasicSchedule = useSelector(state => state.deviceReducer.getSettingsBasicSchedule)
    const getAdvancedSettings = useSelector(state => state.deviceReducer.getAdvancedSettings)
    // const getSettingsBasicTariff = useSelector(state => state.deviceReducer.getSettingsBasicTariff)


    useEffect(() => {
        getCounter()
    }, [])

    useEffect(() => {
        dispatch(getDeviceUser(`${deviceUser}`))
        dispatch(getSingleDeviceUser(`${deviceUser}`))
        dispatch(settingsBasic(`${deviceUser}`))

    }, [])

    useEffect(() => {
        dispatch(advancedSettingsGet(`${deviceUser}`))
    },[])


    // reset counters
    const resetCountsHandler = e => {
        e.preventDefault()
        const data = {}
        data.id = 0
        data.token = '1970d291-392c-44b6-85cc-21fc313f589d'
        dispatch(goResetCount(data))
        navigate("/loadingPage")
    }

    // reset settings
    const serviceResetConfirmHandler = e => {
        e.preventDefault()
        const data = {}
        data.id = getDeviceSingleUser?.id
        data.token = '1970d291-392c-44b6-85cc-21fc313f589d'
        dispatch(goserviceResetConfirm(data))
        // navigate("/loadingPage")
    }

    useEffect(() => {
        setStorageRole(localStorage.getItem('roleId'))
    },[])


    return (
        <div className="device_user_section">
            {
                storageRole && storageRole == 3 && <Navbar/>
            }

            <div className="device_user_section_slice">
                <div className="update_data">
                    <UpdateData/>
                </div>
                <br/>
                <div className="free_mode_fleg">
                    <FreeModeflag/>
                </div>
                <br/>
                {storageRole && storageRole == 3 &&  <DeviceUserGetCounters />}
                <br/>

                {storageRole && storageRole == 3 &&
                    <>
                    <Card sx={{minWidth: 345}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <h4 className="components_name">
                                {t("components")}
                            </h4>
                            <div className="componenets_slice">
                                {
                                    getDeviceUserComponents !== null && getDeviceUserComponents && getDeviceUserComponents.map((i) => {
                                        return (
                                            <div key={i?.id} className="single_components">
                                                <span>
                                                    {language === "en" && i?.name_en}
                                                    {language === "am" && i?.name_am}
                                                    {language === "ru" && i?.name_ru}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Typography>
                    </CardContent>
                </Card><br/><br/>
                    </>}


                <div className="buttons_route">
                    <button onClick={() => setView(1)}
                            className={view === 1 ? 'active_button' : 'counters_all'}>{t('counter')}
                    </button>
                    { getSettingsBasic.length !== 0 && Object.keys(getAdvancedSettings).length !== 0 ?
                        <>
                        <button
                            onClick={() => setView(2)}
                            className={view === 2 ? 'active_button' : 'settings_all'}>{t("basic_settings")}
                        </button>

                        <button
                        onClick={() => setView(3)}
                        className={view === 3 ? 'active_button' : 'advanced_settings'}>{t("advanced_settings")}
                        </button>
                        </> : <span className="settings_not">{t('the_settings_havent')}</span>
                    }


                </div>
                {/*table start*/}

                {
                    view === 1 && <> <TableContainer component={Paper}>
                        <div className="edit_settings">
                            <div style={{color: "green", fontSize: "18px", fontWeight: "600"}}>{t('counter')}</div>
                            <EditCounts getDeviceSingleUserCounter={getDeviceSingleUserCounter}/>
                        </div>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: '50%', textAlign: "center"}}>{t('counter_name')}</TableCell>
                                    <TableCell style={{width: '50%', textAlign: "center"}}>{t('counter_value')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*counter*/}
                                {/*{getDeviceSingleUserCounter && Object.keys(getDeviceSingleUserCounter).map((i) => {*/}
                                {/*    return (*/}
                                {/*        <TableRow key={i?.id}>*/}
                                {/*            <TableCell  component="th" scope="row">*/}
                                {/*                {i}*/}
                                {/*            </TableCell>*/}
                                {/*            <TableCell align="right">{getDeviceSingleUserCounter[i]}</TableCell>*/}
                                {/*        </TableRow>*/}
                                {/*    )*/}
                                {/*})}*/}

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("coinT")} <br/>{t("coinD")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.coinT} <br/>{getDeviceSingleUserCounter?.coinD}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("billT")} <br/>{t("billD")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.billT} <br/>{getDeviceSingleUserCounter?.billD}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("cashlessT")} <br/>{t("cashlessD")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.cashlessT} <br/>{getDeviceSingleUserCounter?.cashlessD}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("bonusT")} <br/>{t("bonusD")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.bonusT} <br/>{getDeviceSingleUserCounter?.bonusD}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("serviceT")} <br/>{t("serviceD")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.serviceT} <br/>{getDeviceSingleUserCounter?.serviceD}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("powerOnTime")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.powerOnTime}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">{t("chSpent")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.chSpent}</TableCell>
                                </TableRow>


                                <TableRow>
                                    <TableCell component="th" scope="row">{t("chTimePaidMode")} <br/>{t("chTimeFreeMode")}</TableCell>
                                    <TableCell align="right">{getDeviceSingleUserCounter?.chTimeFreeMode} <br/>{getDeviceSingleUserCounter?.chTimeFreeMode}</TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </TableContainer>
                        <br/>
                        <form onSubmit={resetCountsHandler}>
                            <button type="submit" className="reset_counts">{t("reset_counts")}</button>
                        </form>

                        {/*table end*/}

                    </>
                }
                {/*table start*/}
                {
                     view === 2 && <>
                        <TableContainer component={Paper}>
                            <div style={{color: "green", fontSize: "18px", fontWeight: "600"}}>{t('basic_settings')}</div>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{
                                            width: '50%',
                                            textAlign: "center",
                                            fontSize: "18px"
                                        }}>{t('settings_name')}</TableCell>
                                        <TableCell style={{
                                            width: '50%',
                                            textAlign: "center",
                                            fontSize: "18px"
                                        }}>{t('settings_value')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{t("billNom")}</TableCell>
                                        <TableCell align="right">{getSettingsBasic?.billNom}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bingoT')} <br /> {t("bingoV")}</TableCell>
                                        <TableCell align="right">{getSettingsBasic?.bingoT} <br/> {getSettingsBasic?.bingoV}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bonusP')} <br/> {t('bonusV')}</TableCell>
                                        <TableCell align="right">{getSettingsBasic?.bonusP} <br/>{getSettingsBasic?.bonusV}</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('coinNom')}</TableCell>
                                        <TableCell align="right">{getSettingsBasic?.coinNom}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bEnd')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.bEnd}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bPct')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.bPct}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bStart')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.bStart}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('bVal')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.bVal}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('tEnd')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.tEnd}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('tPct')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.tPct}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('tStart')}</TableCell>
                                        <TableCell align="right">{getSettingsBasicSchedule?.tStart}</TableCell>
                                    </TableRow>


                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/><br/>
                        <form onSubmit={serviceResetConfirmHandler}>
                            <button type="submit" className="reset_counts">{t("reset_settings")}</button>
                        </form>

                        <ChangeSettingsBasic singleDevice={getSettingsBasic}/>

                    </>
                }

                {/*table end*/}

                {
                    view === 3  &&  <>
                        <TableContainer component={Paper}>
                            <div style={{color: "green", fontSize: "18px", fontWeight: "600"}}>{t('advanced_settings')}</div>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{
                                            width: '50%',
                                            textAlign: "center",
                                            fontSize: "18px"
                                        }}>{t('settings_name')}</TableCell>
                                        <TableCell style={{
                                            width: '50%',
                                            textAlign: "center",
                                            fontSize: "18px"
                                        }}>{t('settings_value')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{t("bonus_modal_text")}</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.bonusMode}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">{t('pauseMode')}</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.pauseMode}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">mode</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.mode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">bpEn</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.bpEn}</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell component="th" scope="row">bpTime</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.bpTime}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">bpCh</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.bpCh}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">service</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.service}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">enabled</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.hopper.enabled}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">nominal</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.hopper.nominal}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">timeout</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.hopper.timeout}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">threshold</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.hopper.threshold}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">period</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.valve.period}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">duration</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.valve.duration}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">count</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.valve.count}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">tickerEnabled</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.tickerEnabled}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">currency</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.currency}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">dColor</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.dColor}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">color</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.color}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">component</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.component}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">screen</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.screen}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">screenColor</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.screenColor}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">hpt</TableCell>
                                        <TableCell align="right">{getAdvancedSettings[0]?.hpt}</TableCell>
                                    </TableRow>

                                    {/*<TableRow>*/}
                                    {/*    <TableCell component="th" scope="row">flowSensor</TableCell>*/}
                                    {/*    <TableCell align="right">{getAdvancedSettings[0]?.flowSensor}</TableCell>*/}
                                    {/*</TableRow>*/}



                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/><br/>
                        <form onSubmit={serviceResetConfirmHandler}>
                            <button type="submit" className="reset_counts">{t("reset_settings")}</button>
                        </form>

                        <ChangeExtendedSettings singleDevice={getSettingsBasic}/>

                    </>
                }
            </div>

            <br/>
            <div className="bonus_slice">
                <h3 className="bonus_title">{t("bonus")}</h3>
                {/*<form onSubmit={flagsfreeModeHandler}>*/}
                {/*    <button type="submit" className="reset_counts">flagsFreeMode</button>*/}
                {/*</form>*/}
                <FreeMode/>
            </div>

        </div>
    );
};

export default DeviceUser;