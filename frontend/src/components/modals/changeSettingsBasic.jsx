// styles
import "./modals.scss"


import * as React from 'react';
import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {useTranslation} from "react-i18next";

// custom imports
import closeButton from '../../images/closeIcon.svg'
//import {goAddTechnician} from "../../redux/actions/addTechnicianAction";
import {useNavigate, useParams} from "react-router-dom";
import {goEditSettings, goEditSettingsBasic} from "../../redux/actions/settingsAction";
import {getCounter} from "../../redux/actions/componentsAction";


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

export default function ChangeSettingsBasic({singleDevice}) {


    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {deviceId} = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const getCounterData = useSelector(state => state.componentsReducer?.getCounter.counter)
    const [dataTest,setDataTest] = useState("")
    const [billNom,setBillNom] = useState("")
    const [bingoT,setBingoT] = useState("")
    const [bingoV,setBingoV] = useState("")
    const [bonusP,setBonusP] = useState("")
    const [bonusV,setBonusV] = useState("")
    const [coinNom,setCoinNom] = useState("")
    const [bEnd,setBEnd] = useState("")
    const [bPct,setBPct] = useState("")
    const [bStart,setBStart] = useState("")
    const [bVal,setBVal] = useState("")
    const [tEnd,setTEnd] = useState("")
    const [tPct,setTPct] = useState("")
    const [tStart,setTStart] = useState("")


    let [data, setData] = useState(
        {
            "token":"1970d291-392c-44b6-85cc-21fc313f589d",
            "settings": [
                {
                    "id": +deviceId,
                    "tariff": [
                        0
                    ],
                    "coinNom": 0,
                    "billNom": 0,
                    "bonusP": 0,
                    "bonusV": 0,
                    "bingoT": 0,
                    "bingoV": 0,
                    "schedule": {
                        "tStart": "12:00",
                        "tEnd": "12:00",
                        "tPct": 0,
                        "bStart": "12:00",
                        "bEnd": "12:00",
                        "bPct": 0,
                        "bVal": 0
                    }
                }
            ]
        }
    )

    useEffect(() => {
        setDataTest(JSON.parse(JSON.stringify(data)))
    },[])

    useEffect(() => {
        dispatch(getCounter(deviceId))
    }, [])



    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeHandler = event => {
        setData(data)
    }

    const editSettings = e => {
        e.preventDefault()
        data.settings[0].billNom = billNom == "" ? singleDevice?.billNom : +billNom
        data.settings[0].bingoT = bingoT == "" ? singleDevice?.bingoT : +bingoT
        data.settings[0].bingoV = bingoV == "" ? singleDevice?.bingoV : +bingoV
        data.settings[0].bonusP = bonusP == "" ? singleDevice?.bonusP : +bonusP
        data.settings[0].bonusV = bonusV == "" ? singleDevice?.bonusV : +bonusV
        data.settings[0].coinNom = coinNom == "" ? singleDevice?.coinNom : +coinNom
        data.settings[0].schedule.bEnd = bEnd == "" ? singleDevice?.schedule.bEnd : bEnd
        data.settings[0].schedule.bPct = bPct == "" ? singleDevice?.schedule.bPct : bPct
        data.settings[0].schedule.bStart = bStart == "" ? singleDevice?.schedule.bStart : bStart
        data.settings[0].schedule.bVal = bVal == "" ? singleDevice?.schedule.bVal : bVal
        data.settings[0].schedule.tEnd = tEnd == "" ? singleDevice?.schedule.tEnd : tEnd
        data.settings[0].schedule.tPct = tPct == "" ? singleDevice?.schedule.tPct : tPct
        data.settings[0].schedule.tStart = tStart == "" ? singleDevice?.schedule.tStart : tStart

        console.log(data.settings[0],'ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')
        console.log(data,'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        dispatch(goEditSettingsBasic(data))
        handleClose()
        // navigate('/loadingPage')
        // navigate('/basicEdit')
    }



    return (
        <div>
            <Button className="link" onClick={handleOpen}> {t('change_settings_basic')}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">

                <div className="container_modal">
                    <form onSubmit={editSettings} id="contact"
                          style={{overflowY:"scroll",height:"500px",justifyContent:"flex-start"}}>
                        <h3>{t('change_settings_basic')}</h3>
                        <fieldset>
                            <h6>{t('billNom')}</h6>
                            <input
                                placeholder={t('billNom')}
                                type="text"
                                tabIndex="1"
                                defaultValue={singleDevice?.billNom}
                                onChange={e => setBillNom(e.target.value)}
                                required
                                autoFocus/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bingoT')}</h6>
                            <input
                                placeholder={t('bingoT')}
                                type="text"
                                tabIndex="1"
                                defaultValue={singleDevice?.bingoT}
                                onChange={e => setBingoT(e.target.value)}
                                required
                                autoFocus/>
                        </fieldset>

                        <fieldset>
                            <h6>{t('bingoV')}</h6>
                            <input
                                placeholder={t('bingoV')}
                                type="text"
                                defaultValue={singleDevice?.bingoV}
                                onChange={e => setBingoV(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bonusP')}</h6>
                            <input
                                placeholder={t('bonusP')}
                                type="text"
                                defaultValue={singleDevice?.bonusP}
                                onChange={e => setBonusP(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bonusV')}</h6>
                            <input
                                placeholder={t('bonusV')}
                                type="text"
                                defaultValue={singleDevice?.bonusV}
                                onChange={e => setBonusV(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('coinNom')}</h6>
                            <input
                                placeholder={t('coinNom')}
                                type="text"
                                defaultValue={singleDevice?.coinNom}
                                onChange={e => setCoinNom(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>

                        <fieldset>
                            <h6>{t('bEnd')}</h6>
                            <input
                                placeholder={t('bEnd')}
                                type="text"
                                defaultValue={singleDevice?.schedule.bEnd}
                                onChange={e => setBEnd(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bPct')}</h6>
                            <input
                                placeholder={t('bPct')}
                                type="text"
                                defaultValue={singleDevice?.schedule.bPct}
                                onChange={e => setBPct(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bStart')}</h6>
                            <input
                                placeholder={t('bStart')}
                                type="text"
                                defaultValue={singleDevice?.schedule.bStart}
                                onChange={e => setBStart(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('bVal')}</h6>
                            <input
                                placeholder={t('bVal')}
                                type="text"
                                defaultValue={singleDevice?.schedule.bVal}
                                onChange={e => setBVal(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>
                        <fieldset>
                            <h6>{t('tEnd')}</h6>
                            <input
                                placeholder={t('tEnd')}
                                type="text"
                                defaultValue={singleDevice?.schedule.tEnd}
                                onChange={e => setTEnd(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>

                        <fieldset>
                            <h6>{t('tPct')}</h6>
                            <input
                                placeholder={t('tPct')}
                                type="text"
                                defaultValue={singleDevice?.schedule.tPct}
                                onChange={e => setTPct(e.target.value)}
                                tabIndex="3"
                                required/>
                        </fieldset>

                        <fieldset>
                            <h6>{t('tStart')}</h6>
                            <input
                                placeholder={t('tStart')}
                                type="text"
                                defaultValue={singleDevice?.schedule.tStart}
                                onChange={e => setTStart(e.target.value)}
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