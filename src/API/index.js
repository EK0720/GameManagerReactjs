
const sendRequestWithToken = (url, method, body) => {
  const token = localStorage.getItem('token'); 

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: JSON.stringify(body),
  };

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Request failed");
    }
  });
};


export const getLeaderboard = (top, gameName) => {
  return sendRequestWithToken(`http://localhost:9000/api/leaderboard/${top}/${gameName}`, 'GET');
};

export const getAccounts = () => {
  return sendRequestWithToken("http://localhost:9000/api/user", 'GET');
};
export const createAccount = (userData) => {
  return sendRequestWithToken("http://localhost:9000/api/create", 'POST', userData);
};

export const getUpdateAccounts = (id, userData) => {
  return sendRequestWithToken(`http://localhost:9000/api/user/update/${id}`, 'PUT', userData);
};

export const getPurchases = (username) => {
  return sendRequestWithToken(`http://localhost:9000/api/user/purchases/${username}`, 'GET');
};

export const getFriendList = (username) => {
  return sendRequestWithToken(`http://localhost:9000/api/checkfriend/${username}`, 'GET');
};

export const removeFriend = (username, friendname) => {
  return sendRequestWithToken(`http://localhost:9000/api/unfriend/${username}/${friendname}`, 'DELETE');
};

export const getMessagesByUsername = (userData) => {
  return sendRequestWithToken("http://localhost:9000/api/user/message", 'POST', userData);
};

export const deleteMessage = (id) => {
  return sendRequestWithToken(`http://localhost:9000/api/user/message/${id}`, 'DELETE');
};

export const deleteUser = (id) => {
  return sendRequestWithToken(`http://localhost:9000/api/user/${id}`, 'DELETE');
};

export const getLogin = (userData) => {
  return fetch("http://localhost:9000/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
};