import axios from "axios";
import {URL} from '../constants/config'

export const tokenVerify = async () => {
  try {
    // Retrieve the token from storage
    const token = localStorage.getItem("token");

    if (token) {
      // Make a REST call to the API to check the token
      const response = await axios.get(`${URL}/auth/verify`, {
        headers: {
          Authorization: token,
        },
      });

      const { expired } = response.data;

      return expired; // Return token expiration status
    } else {
      return true; // Token is not available, consider as expired
    }
  } catch (error) {
    // Handle error if the REST call fails
    console.error("Error checking token expiration:", error);
    return true; // Error occurred, consider token as expired
  }
};
