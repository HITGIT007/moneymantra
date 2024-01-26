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
const fetchSubscriptionsByStrategies = async (userId,token) => {
  try {
    const config = {
      headers: {}
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.post(
      'https://moneymantraai.com/api/customer/get-subscriptions-by-strategies',
      { userId },
      config
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const fetchOrderSummaries = async (userId, startDate, currentTime, token) => {
  try {
    const config = {
      headers: {}
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.post(
      "https://moneymantraai.com/api/customer/accounts/get-order-summaries",
      { userId, startTime: startDate, endTime: currentTime },
      config
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
      headers: {}
    };

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
  endTime,
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
  fetchAdminOrderSummaries
};
