import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://microblog-api-l3mq.onrender.com/api",
    // baseURL: "http://localhost:8800/api",
    withCredentials: true
})