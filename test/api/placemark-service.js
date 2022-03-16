import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const paceMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  }
}