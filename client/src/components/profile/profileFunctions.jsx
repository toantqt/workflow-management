import axios from "axios";

export const showProfile = async (username, accessToken) => {
  return await axios
    .get(`http://localhost:5566/update-profile/${username}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateProfile = async (data, accessToken) => {
  console.log(data.gender);
  return await axios
    .post(
      "http://localhost:5566/update-profile",
      {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        newPassword: data.newPassword,
        avatar: data.avatar,
        gender: data.gender,
        address: data.address,
        _id: data._id,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
