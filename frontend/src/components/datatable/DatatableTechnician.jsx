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
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


// custom imports
import Adduser from "../modals/adduser";
import AddedUsers from "../addedUsers/AddedUsers";
import {Android12Switch} from './Datatable'
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import {API_URI, token} from "../../utils/keys";
import {useEffect} from "react";



export default function DatatableTechnician() {
    const {t} = useTranslation()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checked, setChecked] = React.useState(false);

   const getUsers = useSelector(state => state.getUsers.users)


    // filter technician role
    let users = getUsers.filter(function (user) {
        return user.role == "user";
    });



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (e,id) => {
        //Do something if checkbox is clicked
        if (!e.target.checked) {
            axios.post(`${API_URI}/user/deactivate`, {
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
            axios.post(`${API_URI}/user/activate`, {
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


    useEffect(() => {
        console.clear()
    })


    return (
        <div className="datatable">
            <div className="datatableTitle">
                {t("users_list")}
                <button>
                    <Adduser />
                </button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="20%" className="technics_list">{t("username")}</TableCell>
                            <TableCell width="20%" className="technics_list" align="center">{t("date")}</TableCell>
                            <TableCell width="40%" className="technics_list" align="center">{t("active_inactive")}</TableCell>
                            <TableCell width="20%" className="technics_list" align="center">{t("view")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getUsers.length == 0 ?
                            <AddedUsers /> : getUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell width="25%" component="th" scope="row">
                                <span
                                    className="technics_list_username">
                                    {row.username}</span> <br/>
                                        {row.email}
                                    </TableCell>
                                    <TableCell className="technics_list_username"
                                               align="center">{row.createdAt.substring(0, 10)}</TableCell>
                                    <TableCell width="1%" align="center">
                                        <form>
                                                <FormControlLabel
                                                    control={<Android12Switch
                                                        defaultChecked={row.active == true ? !checked : checked}
                                                        onClick={(e) => handleClick(e,row.id)}
                                                    />}
                                                />
                                        </form>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div className="view_more_slice">
                                            <Link  to={`/users/${row.id}`}>
                                              <span>
                                                View more<i className="fa-solid fa-angle-right"></i>
                                              </span>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
    );
}
