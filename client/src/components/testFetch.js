import React from 'react'
import axios from 'axios'
import {axiosWithAuth} from '../utils/axiosWithAuth'

export const fetchColor = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
        return res
    })
}