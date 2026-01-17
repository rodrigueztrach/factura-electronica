const API_URL = "http://localhost:5000/api"; 

const api = {
  get: async (url, token) => {
    const res = await fetch(API_URL + url, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined
      }
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.msg || "Error en la petición GET");
    return result;
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

    const result = await res.json();
    if (!res.ok) throw new Error(result.msg || "Error en la petición POST");
    return result;
  }
};

export default api;
