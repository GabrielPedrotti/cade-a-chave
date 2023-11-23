import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const api = async (route, method, body = undefined, customHeaders = undefined) => {
  try {
    const headers = customHeaders || {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const response = await axios({
      method,
      url: apiUrl + route,
      data: body,
      headers,
    });
    return response; // Return the response data to be used in the React components

  } catch (error){
    console.error('Error fetching data:', error);
    throw error; // Throw an error to be handled by the component that uses the service
  }

}

export default api;