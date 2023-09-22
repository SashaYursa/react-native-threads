import axios from "axios";
import { LOAD_USER} from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadUser = (id) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `users/${id}`)
        .then(user=> dispatch({type: LOAD_USER, payload: user.data}))
    }
}