import axios from "axios";

const state = {
  tutorData: null,
  subjectData: null,
  filterData: {
    state: {},
    location: {
      within: {
        km: "",
        of: "",
      },
    },
    availabilityForPrivateTutoring: {},
    subjects: {},
    areaOfStudy: {},
  },
  tutorDataLoading: null,
};

const getters = {
  StateTutorData: state => state.tutorData,
  StateSubjectData: state => state.subjectData,
  StateTutorFilterData: state => state.filterData,
  StateTutorDataLoading: state => state.tutorDataLoading,
};

const actions = {
  async getTutorData({ dispatch }, data) {
    await dispatch("updateTutorLoading", true);
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/tutors`, {
      filter: data.filter,
      paging: data.paging,
    });
    await dispatch("updateTutor", response.data);
    await dispatch("updateTutorLoading", false);
  },

  async getSubjectData({ dispatch }) {
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/subjects`);
    await dispatch("updateSubject", response.data.results);
  },

  async updateTutor({ commit }, tutor) {
    await commit("setTutor", tutor);
  },

  async updateSubject({ commit }, subject) {
    await commit("setSubject", subject);
  },

  async updateFilter({ commit }, filter) {
    await commit("setFilter", filter);
  },

  async updateTutorLoading({ commit }, loading) {
    await commit("setTutorLoading", loading);
  },
};

const mutations = {
  setTutor(state, tutor) {
    state.tutorData = tutor;
  },

  setSubject(state, subject) {
    state.subjectData = subject;
  },

  setFilter(state, filter) {
    state.filterData = filter;
  },

  setTutorLoading(state, loading) {
    state.tutorDataLoading = loading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
