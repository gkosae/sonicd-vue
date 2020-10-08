import axios from "axios";
import { API_URL } from "@/constants";

export default {
  fetchTasks(page = 1) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/tasks?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            resolve(res.data.tasks);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  addTask({ url, destination }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/tasks`, {
          url: url,
          destination_directory: destination,
        })
        .then((res) => {
          if (res.data.success) {
            resolve(res.data.task);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  fetchDestinations() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/destinations`)
        .then((res) => {
          if (res.data.success) {
            resolve(res.data.destinations);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
