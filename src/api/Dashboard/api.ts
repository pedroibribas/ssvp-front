import axios from "axios";

const baseURL = process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_API_URL;

export const api = axios.create({
    baseURL: baseURL + "/api"
});