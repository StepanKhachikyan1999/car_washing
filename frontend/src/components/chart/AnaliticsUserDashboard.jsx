// styles
import './chart.scss'
import React, {useEffect, useState} from "react";
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area
} from "recharts";
import {useTranslation} from "react-i18next";
import {API_URI, token} from "../../utils/keys";
import axios from "axios";


export default function AnaliticsUserDashboard() {
    const [graphicData,setGraphicData] = useState()
    const [totalBillPoint,setTotalBillPoint] = useState()
    const [totalCoin,setTotalCoin] = useState()
    const [cashless,setCashless] = useState()
    const [bonusPoint,setBounusPoint] = useState()
    const {t} = useTranslation()

    console.log(graphicData,'oop50')
    console.log(totalBillPoint,'oop52')
    console.log(totalCoin,'oop53')
    console.log(cashless,'oop54')

    let one = `${API_URI}/counter`;

    const requestOne = axios.get(one,{ headers: {'Authorization': `Bearer ${token}`}});

    useEffect(() => {
        axios
            .all([requestOne])
            .then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    setGraphicData(responseOne.data)
                    let countBill = 0
                  for(let i = 0; i < responseOne.data.length;i++) {
                      responseOne.data[i].CarWashDevices.forEach((m) => {
                          countBill +=  m.Counter.billD + m.Counter.billT
                      })
                      setTotalBillPoint(countBill)

                  }

                  let countCoin = 0
                    for(let i = 0; i < responseOne.data.length;i++) {
                        responseOne.data[i].CarWashDevices.forEach((m) => {
                            countCoin +=  m.Counter.coinD + m.Counter.coinT
                        })
                        setTotalCoin(countCoin)

                    }


                    let countCashless = 0
                    for(let i = 0; i < responseOne.data.length;i++) {
                        responseOne.data[i].CarWashDevices.forEach((m) => {
                            countCashless +=  m.Counter.cashlessD + m.Counter.cashlessT
                        })
                        setCashless(countCashless)

                    }

                    let countBonus = 0
                    for(let i = 0; i < responseOne.data.length;i++) {
                        responseOne.data[i].CarWashDevices.forEach((m) => {
                            countBonus +=  m.Counter.bonusD + m.Counter.bonusT
                        })
                        setBounusPoint(countBonus)

                    }

                })
            )
            .catch(errors => {
                // react on errors.
                console.error(errors);
            });

    },[0])

    const data = [
        {
            name: `${t('banknotes')}`,
            pv: 800,
            money: totalBillPoint,
            cnt: 490
        },
        {
            name: `${t('coin')}`,
            pv: 967,
            money: totalCoin,
            cnt: 590
        },
        {
            name: `${t('cashless')}`,
            pv: 1098,
            money: cashless,
            cnt: 350
        },
        {
            name: `${t('bonus_pay')}`,
            pv: 1200,
            money: bonusPoint,
            cnt: 480
        },
    ];

    return (
        <>

                            <div className="wrapper_block">
                                <span className="car_wash_bill_point">
                                    {t('money_in_banknotes')} - {totalBillPoint && totalBillPoint}  ֏
                                </span>
                                <span className="car_wash_bill_coin">
                                    {t('money_in_coins')} - {totalCoin && totalCoin}  ֏
                                </span>
                                <span className="car_wash_bill_cashless">
                                    {t('cashless_payments')} - {cashless && cashless}  ֏
                                </span>
                                <span className="car_wash_bill_bonus">
                                    {t('bonus_payment')} - {bonusPoint && bonusPoint}  ֏
                                </span>
                                <span className="car_wash_bill_total">
                                    {t('total_count')} - {totalCoin && totalCoin + cashless + bonusPoint + totalBillPoint }  ֏
                                </span>
                            </div>

            <h3 className="income_graph_text">{t('income_graph')}</h3>

                        <ComposedChart
                            width={1000}
                            height={400}
                            data={data}
                            margin={{
                                top: 20,
                                right: 80,
                                bottom: 20,
                                left: 20
                            }}
                        style={{margin:"0 auto"}}>


                            <CartesianGrid stroke="#f5f5f5" />

                            <XAxis
                                dataKey="name"
                                label={{ value: "Pages", position: "insideBottomRight", offset: 0 }}
                                scale="band"

                            />
                            <YAxis label={{ value: "Index", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey='money' fill="#8884d8" stroke="#8884d8" />
                        </ComposedChart>

        </>

    );
}
