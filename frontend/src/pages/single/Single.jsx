// styles
import "./single.scss";

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axios from "axios";


// custom imports
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import user_img from "../../images/user.png"
import {API_URI, token} from "../../utils/keys";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const Single = () => {
  const {user} = useParams()
  const [singleUser,setSingleUser] = useState()
  const {t} = useTranslation()

  const users = useSelector(state => state.getUsers.users.filter(i => i.id == +user)[0])

  useEffect(() => {
    const instance = axios.create({
      baseURL: `${API_URI}/auth/me`,
      timeout: 1000,
      headers: {'Authorization': `Bearer ${token}`}
    });

    instance.get(`${API_URI}/auth/me`)
        .then(response => {
          setSingleUser(response.data)
        })
  },[0])

  return (
    <div className="single">
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">{t('information')}</h1>
            <div className="item">
              <img
                src={user_img}
                alt="img"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{t('username')} - {users?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{users?.email === null ? `${t('not_name')}` : users?.email}</span>
                </div>
                {/*<div className="detailItem">*/}
                {/*  <span className="itemKey">Phone:</span>*/}
                {/*  <span className="itemValue">+7777777777777</span>*/}
                {/*</div>*/}
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Yerevan
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Armenia</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;