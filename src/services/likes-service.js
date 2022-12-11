/**
 * @file Create axios call function to node server
 */
import axios from "axios";

// change this to point to your server on Heroku

// const REACT_APP_BASE_URL = "https://cs5500fa22heyezhounode.herokuapp.com";
// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:4000";
const USER_API = `${BASE_URL}/users`;
const TUIT_API = `${BASE_URL}/tuits`;

/**
 * Create a new like of a tuit
 * @returns newly created tuit
 * @param uid
 * @param tid
 */
export const createLike = (uid,tid) =>
    axios.post(`${USER_API}/${uid}/likes/${tid}`).then((response) => response.data);
/**
 * Find users that like the tuit by id
 * @param tid
 */
export const findUsersThatLikeTheTuitByTuitId = (tid) =>
    axios.get(`${TUIT_API}/${tid}/likes`).then((response) => response.data);


/**
 * Delete like by user id
 * @param  {string} uid user id
 * @param  {string} tid tuit id
 * return delete status
 */
export const deleteLike = (uid,tid) =>
    axios.delete(`${USER_API}/${uid}/likes/${tid}`).then((response) => response.data);


/**
 * Find tuit liked by user id
 * @param  {string} uid user id
 * return LikeHistory of user
 */

export const findTuitsLikedByAUser = (uid) =>
    axios.get(`${USER_API}/${uid}/likes`).then((response) => response.data);


export const userTogglesTuitLikes = (uid, tid) =>
    axios.put(`${USER_API}/${uid}/likes/${tid}`).then((response) => response.data);