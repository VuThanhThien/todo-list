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
  /**Dùng để load lên store, lưu trữ vào localStorage */
  loadWork({ commit }, payload) {
    // sắp xếp theo thời gian
    payload = payload.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    commit("LOAD_WORK", payload);
    // lưu vào local storage
    localStorage.setItem("listWork", JSON.stringify(payload));
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
