//styles
import "./datatable.scss";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from '@mui/material/TextField';


// custom imports

import NestedModal from "../modals/modal";
import PagePreLoader from "../PagePreLoader/PagePreLoader";
import {API_URI, token} from "../../utils/keys";
import axios from "axios";
import EditTechnician from "../modals/editTechnician";
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";
import {getClearFiltrateUsers, getFiltrateUsers, getUsers} from "../../redux/actions/getUsersAction";
import {useEffect} from "react";


export const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 5,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 18,
            height: 18
        },
        "&:before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12
        },
        "&:after": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12
        }
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 20,
        height: 20,
        margin: 0
    }
}));

export default function DataTable() {
    const checked=false;
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const users = useSelector(state => state.getUsers.users)
    const loading = useSelector(state => state.getUsers.filLoading)
    const filtrate = useSelector(state => state.getUsers.filtrate)
    let language = cookies.get("i18next")



    const handleClick = (e,id) => {
        //Do something if checkbox is clicked
        if (!e.target.checked) {
            axios.post(`${API_URI}/technician/deactivate`, {
                id
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (response) {
                   return "ok"
                })
                .catch(function (error) {
                    console.error(error);
                });
        } else {
            axios.post(`${API_URI}/technician/activate`, {
                id
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (response) {
                    return "ok"
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };


    const dispatchUser = (role) => {
        dispatch(getFiltrateUsers(role))
    }

    useEffect(() => {
        console.clear()
    })

    return (
     <div className="datatable">
            <div className="datatableTitle">
                {t('technics_and_users_list')}
                    <NestedModal />
            </div>

         <div className="filter_user_technican">
             <button  className="user_button" onClick={()=>dispatchUser("user")}>
                 user
             </button>

             <button className="technican_button" onClick={()=>dispatchUser("technician")}>
                 technican
             </button>
             {
                 !loading && (
                     <button className="technican_button_clear" onClick={()=>dispatch(getClearFiltrateUsers())}>
                         {t("clear")}
                     </button>
                 )
             }
         </div>



        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width="20%" className="technics_list">{t("username")}</TableCell>
                        <TableCell width="20%" className="technics_list" align="center">{t("date")}</TableCell>
                        <TableCell width="40%" className="technics_list" align="center">{t("active_inactive")}</TableCell>
                        <TableCell width="20%" align="center">{t("edit")} <i className="fa-solid fa-pen-to-square"></i></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        !loading ? (filtrate.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell width="25%" component="th" scope="row">
                        <span
                        className="technics_list_username">
                    {row.username}
                    {row.role == "technician" && <i style={{color:"orange",marginLeft:"5px"}} className="fa-solid fa-gears"></i>}
                        </span> <br/>
                    {row.email}
                        </TableCell>
                        <TableCell className="technics_list_username" align="center">{row.createdAt.substring(0, 10)}</TableCell>
                        <TableCell  width="1%" align="center">
                        <form>
                    {row.role == "technician" &&
                        <FormControlLabel
                        control={<Android12Switch
                        defaultChecked={row.active == true ? !checked : checked}
                        onClick={(e) => handleClick(e,row.id)}
                        />}
                        />
                    }
                        </form>
                        </TableCell>
                        <TableCell align="center">
                    {row.role == "technician" && <EditTechnician id={row.id} />}
                        </TableCell>
                        </TableRow>
                        ))): users.length == 0 ? <PagePreLoader />   : users.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell width="25%" component="th" scope="row">
                                <span
                                    className="technics_list_username">
                                    {row.username}
                                    {row.role == "technician" && <i style={{color:"orange",marginLeft:"5px"}} className="fa-solid fa-gears"></i>}
                                </span> <br/>
                                    {row.email}
                            </TableCell>
                            <TableCell className="technics_list_username" align="center">{row.createdAt.substring(0, 10)}</TableCell>
                            <TableCell  width="1%" align="center">
                                <form>
                                        {row.role == "technician" &&
                                                <FormControlLabel
                                                        control={<Android12Switch
                                                        defaultChecked={row.active == true ? !checked : checked}
                                                        onClick={(e) => handleClick(e,row.id)}
                                                    />}
                                                />
                                        }
                                </form>
                            </TableCell>
                            <TableCell align="center">
                                {row.role == "technician" && <EditTechnician id={row.id} />}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
     </div>
    );
}
