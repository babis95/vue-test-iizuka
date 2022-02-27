import { POSTCallHelper, GETCallHelper } from "../../../services.js";
export default {
  // Fetch All case actions
  async fetchCaseActions(context, payload) {
    const response = await POSTCallHelper("/list", payload);
    context.commit("setCaseActions", response.data);
  },
  // Fetch case action based on ID passed
  async fetchCaseDetails(context, payload) {
    const customURL = `/details?id=${payload}`;
    const response = await GETCallHelper(customURL);
    context.commit("setCaseActionDetails", response.data);
  },
  // Submit Action status change
  async completeAction(context, payload) {
    const response = await POSTCallHelper("/transition", payload);
    console.log("Process response: ", response);
  },
};
