import axios from "axios";

// const BASE_URL = "https://cs5500fa22heyezhounode.herokuapp.com";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_URL = "http://localhost:4000";

const TUITS_API = `${BASE_URL}/api/tuits`;
// const USERS_API = `${BASE_URL}/api/users`;

// const TUITS_API = `${BASE_URL}/tuits`;
/**
 * Create axios with credentials
 */
const api = axios.create({
    withCredentials: true,
});

/**
 * Create a new tuit with a tuit
 * @param {tuit} tuit tuit to be created
 * @returns newly created tuit
 */
export const createTuit = (tuit) =>
    axios.post(`${TUITS_API}`, tuit).then((response) => response.data);
/**
 * Create tuit with a user id in the param of the url
 * @param  {string} uid user id
 * @param  {tuit} tuit tuit to be created
 * return newly created tuit
 */
export const createTuitByUser = (uid, tuit) =>
    api.post(`${TUITS_API}/users/${uid}`, tuit).then((response) => response.data);
/**
 * Find all tuits
 * return tuit in array
 */
export const findAllTuits = () =>
    axios.get(TUITS_API).then((response) => response.data);
/**
 * Find tuits by user id
 * @param  {string} uid user id
 */
export const findTuitsByUser = (uid) =>
    api.get(`${TUITS_API}/users/${uid}`).then((response) => response.data);
/**
 * Find tuit by tuit id
 * @param {string} tid tuit id
 * return tuit found
 */
export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`).then((response) => response.data);
/**
 * Delete tuit by user id
 * @param {string} uid user id
 * return delete status
 */
export const deleteTuit = (uid) =>
    axios.delete(`${TUITS_API}/${uid}`).then((response) => response.data);

/**
 * Delete tuit by tuit id
 * @param {string} tid tuit id
 * return delete status
 */
export const deleteTuitById = (tid) =>
    axios.delete(`${TUITS_API}/tuit/${tid}`).then((response) => response.data);
/**
 * Update tuit by tuit id
 * @param {string} tid tuit id
 * @param {tuit} tuit to be updated
 * return updated tuit
 */
export const updateTuit = (tid, tuit) =>
    axios.put(`${TUITS_API}/${tid}`, tuit).then((response) => response.data);
// export const createTuit = (user) =>
//     axios.post(`${TUITS_API}`, user).then((response) => response.data);
//
// export const createTuitByUser = (uid, user) =>
//     axios.post(`${TUITS_API}/${uid}`, user).then((response) => response.data);
//
// export const findAllTuits = () =>
//     axios.get(TUITS_API).then((response) => response.data);
//
// export const findTuitsByUser = (uid) =>
//     axios.get(`${TUITS_API}/users/${uid}`).then((response) => response.data);
//
// export const findTuitById = (tid) =>
//     axios.get(`${TUITS_API}/${tid}`).then((response) => response.data);
//
// export const deleteTuit = (tid) =>
//     axios.delete(`${TUITS_API}/${tid}`).then((response) => response.data);
//
// export const deleteTuitByUser = (userid) =>
//     axios.delete(`${TUITS_API}/${userid}`).then((response) => response.data);
//
// export const updateTuit = (tid) =>
//     axios.delete(`${TUITS_API}/${tid}`).then((response) => response.data);
//
//

