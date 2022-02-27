import axios from "axios";

axios.defaults.baseURL = "https://ngo.training.gotoji.net/api/caseAction";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
//E7E806B6D804F47206AD6DCBEAD1499C.1
// NOT BEING PASSED FOR SOME REASON
// if (localStorage.getItem("token") != null) {
//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${localStorage.getItem("token")}`;
// }
