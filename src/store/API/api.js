import axios from "axios";
import { DEFAULT_API_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const defaultOptions = {
    baseURL: DEFAULT_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userId');
    config.headers.Authorization =  token ? token : '';
    return config;
  });
  export default instance;