import apiService from './apiService'; // make sure this points to the file where the instance is created

const fetchSubscriptionsByStrategies = async (userId) => {
  try {
    const response = await apiService.post(
      '/customer/get-subscriptions-by-strategies',
      { userId }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchOrderSummaries = async (userId, startDate, currentTime) => {
  try {
    const response = await apiService.post(
      '/customer/accounts/get-order-summaries',
      { userId, startTime: startDate, endTime: currentTime }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const stopNewOrdersBySubscription = async (userId, userSubscriptionId, allowRealOrder, type) => {
  try {
      const requestBody = {
          userId,
          userSubscriptionId,
          allowRealOrder,
          type
      };

      const response = await apiService.post(
          '/customer/stop-new-orders-by-subscription',
          requestBody
      );

      return response;
  } catch (error) {
      console.error("Error in stopping new orders by subscription:", error);
      throw error;
  }
};
const fetchAlgorithms = async (userId) => {
  try {
    const response = await apiService.post(
      '/admin/get-algorithms-by-strategies',
      { userId }
    );
    return response.data.algorithmDTOs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const stopNewOrdersByAlgorithm = async (userId, algorithmId, allowRealOrder, type) => {
  console.log("stopNewOrdersByAlgorithm called ===>")
  console.log({userId, algorithmId, allowRealOrder, type})
    try {
      const requestBody = {
        userId,
        algorithmId,
        allowRealOrder,
        type
      };
      
      const response = await apiService.post(
        '/admin/stop-new-orders-by-algorithm',
        requestBody
      );
      
      // Assuming you want to return the entire response object, not just the data
      return response;
    } catch (error) {
      console.error("Error stopping new orders by algorithm:", error);
      throw error;
    }
  };
  
export { fetchSubscriptionsByStrategies, fetchOrderSummaries, fetchAlgorithms, stopNewOrdersByAlgorithm, stopNewOrdersBySubscription };
