import { createSlice } from "@reduxjs/toolkit";
import {IconX} from "@tabler/icons-react";
import Api from "../../lib/Api";
import {showNotification} from "@mantine/notifications";

import React from "react";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";



export type LoginCheck = {

    isLoggedIn: boolean
}

const initialState: LoginCheck = {isLoggedIn: false}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state ,action) => {
            state.isLoggedIn = true;
        },
        logoutSuccess: (state, action) =>  {
            state.isLoggedIn = false;
        },
    }
});

export default authSlice.reducer

export const { loginSuccess, logoutSuccess } = authSlice.actions

export const logout = () => async (dispatch:any) => {

    const {data} = await Api.get('/user/logout')
    try {
        if (data.STATUS_CODE === 200){
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('activeNav')
            localStorage.removeItem('role')
            localStorage.removeItem('ci')
            localStorage.removeItem('si')
            localStorage.removeItem('isallow')
            localStorage.removeItem('stdCat');
            localStorage.removeItem('stdFrmStatus');
            localStorage.removeItem('stdName');
            localStorage.removeItem('collegeCode');
            localStorage.removeItem('clgType');
            localStorage.removeItem('uid')
            localStorage.removeItem('examEvalNo')
            window.location.href = '/';
            return dispatch(logoutSuccess(false))
        }
        else
        {
            return showNotification({
                title: 'Error',
                message: "Something Went Wrong",
                color: 'red',
            })
        }
    } catch (e) {
        showNotification({
            title: 'Error',
            message: "Something Went Wrong",
            color: 'red',
        })
    }
}

