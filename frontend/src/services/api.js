const API_URL = "http://localhost:3000/api"; // Backend corre en 3000

const api = {
  get: async (url, token) => {
    const res = await fetch(API_URL + url, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined
      }
    });

    return res.json();
  },

  post: async (url, data, token) => {
    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: JSON.stringify(data)
    });

    return res.json();
  }
};

export default api;
