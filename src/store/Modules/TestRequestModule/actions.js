import { POSTCallHelper, GETCallHelper } from "../../../services.js";
export default {
  async fetchCaseActions(context, payload) {
    const response = await POSTCallHelper("/list", payload);
    context.commit("setCaseActions", response.data);
  },
  async fetchCaseDetails(context, payload) {
    const customURL = `/details?id=${payload}`;
    const response = await GETCallHelper(customURL);
    context.commit("setCaseActionDetails", response.data);
  },
  async completeAction(context, payload) {
    const response = await POSTCallHelper("/transition", payload);
    console.log("Process response: ", response);
  },
};
