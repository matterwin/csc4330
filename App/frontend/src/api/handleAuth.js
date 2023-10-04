import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/auth', // Adjust the base URL to your API endpoint
});

const baseURL = 'http://localhost:5000/auth/login';

export const login = async (username, password) => {
  try {

    const res = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    console.log(res.json());

    if (res.status !== 200) {
        throw new Error("Info went wrong");
    }

    const data = await res.json();
    return data;
} catch (err) {
    console.log(err);
}
};    
  
export default api;
