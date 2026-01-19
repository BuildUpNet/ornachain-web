import axios from 'axios';
// const api_url = 'http://192.168.1.35/laravel/ornachain_admin/public/api/';
const api_url = 'http://192.168.0.22/laravel/ornachain_admin/public/api/';
const errorValues = '';

export const getList = (type) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    axios
      .get(api_url + type, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const postData = (type, data) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');

    axios
      .post(api_url + type, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // if (response.status === 200) {
        resolve(response);
        //   Util.showSuccessToast(errorValues);
        // }
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const getdata = (type, ID) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');

    axios
      .get(api_url + type, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};
