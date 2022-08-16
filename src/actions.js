import axios from "axios";

const GetUserList = (page) => {
  return async function getUsersThunk(dispatch) {
    const params = { page: page, results: 20 };
    const response = await axios.get("https://randomuser.me/api/", {
      params: params,
    });
    if (response) {
      dispatch({ type: "USER_LIST_SUCCESS", payload: response.data.results });
    }
  };
};
export { GetUserList };
