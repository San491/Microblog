import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://microblog-api-l3mq.onrender.com/api",
    withCredentials: true
})