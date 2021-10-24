import _axios from "axios";

import { BASE_URL } from "../constants";

// axios configuration

const axios = _axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default axios;
