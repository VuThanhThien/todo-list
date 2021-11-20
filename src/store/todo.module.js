const state = {
  listWork: [
    {
      title: "",
      description: "",
      dueDate: "",
      prioriry: 0,
    },
  ],
};

const getters = {
  listWork(state) {
    return state.listWork;
  },
};

const actions = {
  loadWork({ commit }, payload) {
    commit("LOAD_WORK", payload);
  },
};

const mutations = {
  LOAD_WORK(state, payload) {
    state.listWork = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
