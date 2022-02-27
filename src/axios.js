import axios from "axios";

axios.defaults.baseURL = "https://ngo.training.gotoji.net/api/caseAction";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
