import axios from "axios";

export const showProfile = async (id, accessToken) => {
  return await axios
    .get(`http://localhost:5566/update-profile/${id}`, {
      headers: { Authorization: `${accessToken}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const updateProfile = async (data, accessToken) => {
  return await axios
    .post(
      "http://localhost:5566/update-profile",
      {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        gender: data.gender,
        address: data.address,
        _id: data.id,
        avatar: data.avatar,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};

export const updatePassword = async (data, accessToken) => {
  return await axios
    .post(
      "http://localhost:5566/update-password",
      {
        password: data.password,
        newPassword: data.newPassword,
        _id: data.id,
      },
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};
export const updateAvatar = async (data, accessToken) => {
  //console.log(data);
  const formData = new FormData();
  formData.append("avatar", data.userAvatar, data.userAvatar.name);
  formData.append("id", data.id);
  formData.append("gender", data.gender);
  formData.append("address", data.address);
  formData.append("oldAvatar", data.oldAvatar);
  //console.log(formData);
  return await axios
    .post(
      "http://localhost:5566/update-avatar",

      formData,
      {
        headers: { Authorization: `${accessToken}` },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //console.log(error);
    });
};
