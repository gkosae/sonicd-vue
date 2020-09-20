import axios from "axios";
import { CURRENT_API_URL } from "@/constants";

export default {
  fetchTasks() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${CURRENT_API_URL}/tasks`)
        .then(res => {
          if (res.data.success) {
            resolve(res.data.tasks)
          } else {
            reject(res.data.error)
          }
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },
  createTask({ url, destination }) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${CURRENT_API_URL}/tasks`, {
          url: url,
          destination_directory: destination
        })
        .then(res => {
          if (res.data.success) {
            resolve(res.data.task)
          } else {
            reject(res.data.error)
          }
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },
  fetchDestinations() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${CURRENT_API_URL}/destinations`)
        .then(res => {
          if (res.data.success) {
            resolve(res.data.destinations)
          } else {
            reject(res.data.error)
          }
        })
        .catch(err => {
          console.log(err);
          reject(err)
        })
    })
  },
}