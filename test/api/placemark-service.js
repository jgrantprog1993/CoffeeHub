import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placeMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  },
  async getUser(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },
  async createLocation(location) {
    const res = await axios.post(`${this.placeMarkUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocation() {
    const response = await axios.delete(`${this.placeMarkUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.placeMarkUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocation() {
    const res = await axios.get(`${this.placeMarkUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placeMarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  }
};