import axios from "axios";

export const createOrUpdateUser = async (authtoken, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    data,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const registerUser = async (authtoken, userData) => {
  return await axios.post(`${process.env.REACT_APP_API}`, userData, {
    headers: {
      authtoken,
    },
  });
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
