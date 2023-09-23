import axios from "axios";
import { LOAD_USERS} from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadUsers = () => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `users`)
        .then(users=> dispatch({type: LOAD_USERS, payload: users.data}))
    }
}