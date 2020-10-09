import Vuex from "vuex";
import Vue from "vue";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    destinations: [],
  },
  getters: {
    allDestinations(state) {
      return state.destinations;
    },
    allTasks(state) {
      return state.tasks;
    },
  },
  actions: {
    async fetchDestinations({ commit }) {
      let destinations = await api.fetchDestinations();
      commit("setDestinations", destinations);
    },
    async fetchTasks({ commit }) {
      let tasks = await api.fetchTasks();
      commit("setTasks", tasks);
    },
    async createTask({ dispatch }, { url, destination }) {
      let task = await api.addTask({
        url,
        destination,
      });

      dispatch("addOrReplaceTask", task);
    },
    async addOrReplaceTask({ commit, getters }, task) {
      const taskExists = getters.allTasks
        .map((tsk) => tsk.id)
        .includes(task.id);

      if (taskExists) {
        commit("replaceTask", task);
      } else {
        commit("addTask", task);
      }
    },
  },
  mutations: {
    setDestinations(state, destinations) {
      state.destinations = destinations;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      if (state.tasks.length == 5) {
        state.tasks.pop();
      }

      state.tasks.unshift(task);
    },
    replaceTask(state, task) {
      state.tasks = state.tasks.filter((tsk) => task.id != tsk.id);
      state.tasks.unshift(task);
      state.tasks.sort((a, b) => {
        const aDate = new Date(a.created_at);
        const bDate = new Date(b.created_at);
        return bDate > aDate ? 1 : -1;
      });
    },
  },
});
