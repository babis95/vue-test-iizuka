import { createStore } from "vuex";

import testRequestModule from "./Modules/TestRequestModule/index.js";

// Creates store modules
const store = createStore({
  modules: {
    testRequest: testRequestModule,
  },
});

export default store;
