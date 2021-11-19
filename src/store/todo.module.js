const state = {
  listWork: [
    {
        title: "",
        description:"",
        dueDate:"",
        prioriry: 0
      }
  ],
};

const getters = {
    listWork(state) {
    return state.listWork;
  }
};

const actions = {
  getListWork(context) {
    let data = localStorage.getItem('listWork');
        context.commit('LOAD_WORK', data);
  },
};

const mutations = {
  LOAD_WORK(state, payload){
    state.listWork = payload;
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
