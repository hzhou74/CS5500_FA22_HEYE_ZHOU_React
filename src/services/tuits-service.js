import axios from "axios";

const BASE_URL = "https://cs5500fa22heyezhounode.herokuapp.com";

// const BASE_URL = "http://localhost:4000";
const TUITS_API = `${BASE_URL}/tuits`;

export const createTuit = (user) =>
    axios.post(`${TUITS_API}`, user).then((response) => response.data);

export const createTuitByUser = (uid, user) =>
    axios.post(`${TUITS_API}/${uid}`, user).then((response) => response.data);

export const findAllTuits = () =>
    axios.get(TUITS_API).then((response) => response.data);

export const findTuitsByUser = (uid) =>
    axios.get(`${TUITS_API}/users/${uid}`).then((response) => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`).then((response) => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`).then((response) => response.data);

export const deleteTuitByUser = (userid) =>
    axios.delete(`${TUITS_API}/${userid}`).then((response) => response.data);

export const updateTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`).then((response) => response.data);



