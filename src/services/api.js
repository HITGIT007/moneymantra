import axios from "axios";

// Create an Axios instance with default settings
const apiService = axios.create({
  baseURL: "https://moneymantraai.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Use Axios request interceptor to dynamically add the Authorization token to each request
apiService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const login = async (loginData) => {
  try {
    const response = await axios.post("https://moneymantraai.com/api/auth/login", loginData);
    let token, userId, name, userType;
    if (response.status === 200 || response.status === 201) {
      token = response.data.token;
      userId = response.data.userId;
      name = response.data.name;
      userType = response.data.userType;
    }

    if (token) {
      // Store the token in sessionStorage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("logged", "true");
      // Optionally, set the token on the apiService instance for immediate use
      apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response.data; // Return the full response data or just the token as needed
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const fetchSubscriptionsByStrategies = async (userId) => {
  try {
    const response = await apiService.post(
      "/customer/get-subscriptions-by-strategies",
      { userId }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getOrderDetails = async (userId) => {
  try {
    const response = await apiService.post(
      "/admin/accounts/get-order-details",
      { userId }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchOrderSummaries = async (userId, startDate, currentTime, token) => {
  try {
    const response = await apiService.post(
      "https://moneymantraai.com/api/customer/accounts/get-order-summaries",
      { userId, startTime: startDate, endTime: currentTime }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const stopNewOrdersBySubscription = async (
  userId,
  userSubscriptionId,
  allowRealOrder,
  type
) => {
  try {
    const requestBody = {
      userId,
      userSubscriptionId,
      allowRealOrder,
      type,
    };

    const response = await apiService.post(
      "/customer/stop-new-orders-by-subscription",
      requestBody
    );

    return response;
  } catch (error) {
    console.error("Error in stopping new orders by subscription:", error);
    throw error;
  }
};
const fetchAlgorithms = async (userId, token) => {
  try {
    const config = {
      headers: {},
    };

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.post(
      "https://moneymantraai.com/api/admin/get-algorithms-by-strategies",
      { userId },
      config
    );
    return response.data.algorithmDTOs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const stopNewOrdersByAlgorithm = async (
  userId,
  algorithmId,
  allowRealOrder,
  type
) => {
  console.log("stopNewOrdersByAlgorithm called ===>");
  console.log({ userId, algorithmId, allowRealOrder, type });
  try {
    const requestBody = {
      userId,
      algorithmId,
      allowRealOrder,
      type,
    };

    const response = await apiService.post(
      "/admin/stop-new-orders-by-algorithm",
      requestBody
    );

    // Assuming you want to return the entire response object, not just the data
    return response;
  } catch (error) {
    console.error("Error stopping new orders by algorithm:", error);
    throw error;
  }
};

const fetchAdminOrderSummaries = async (
  userId,
  customerId,
  startTime,
  endTime
) => {
  try {
    const response = await apiService.post(
      "/admin/accounts/get-order-summaries",
      {
        userId: parseInt(userId),
        customerUserId: parseInt(customerId),
        startTime: startTime,
        endTime: endTime,
      }
    );
    return response.data; // Handle the response as needed
  } catch (error) {
    console.error("Error fetching admin order summaries:", error);
    throw error; // You may want to handle the error differently depending on your use case
  }
};
export {
  fetchSubscriptionsByStrategies,
  fetchOrderSummaries,
  fetchAlgorithms,
  stopNewOrdersByAlgorithm,
  stopNewOrdersBySubscription,
  fetchAdminOrderSummaries,
  login,
  getOrderDetails
};
