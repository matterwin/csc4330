import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/auth', // Adjust the base URL to your API endpoint
});

export const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', {
        username: username,
        password: password,
      });
      // Handle the response from the server here
      return res.data; // You might want to return data from the server for further use.
    } catch (error) {
      // Handle any errors here
      throw error;
    }
};    
  
export default api;
