// apiService.js
import axios from 'axios';

const token = sessionStorage.getItem("token"); // You might want to get the token in the component itself before making the call

// Create an Axios instance with default settings
const apiService = axios.create({
  baseURL: 'https://moneymantraai.com/api/',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }) // Spread operator to conditionally add auth header
  },
});

export default apiService;
