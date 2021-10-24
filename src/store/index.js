import { createStore } from "vuex";
// import createPersistedState from "vuex-persistedstate";
import filter from "./modules/filter";

// Create store
const store = createStore({
  modules: {
    filter,
  },
  // plugins: [createPersistedState()],
});

export default store;
