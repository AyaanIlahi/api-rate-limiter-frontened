import api from "./utils/fetchWithAuth.js"; // Import the Axios instance

export const createToken = async (setMessage, setLoading) => {
  setLoading(true); // Start loading

  try {
    const res = await api.get("/createToken");

    if (res.status === 200) {
      localStorage.setItem("rate-limit-token", res.data.token); // Store JWT in localStorage
      setMessage(res.data.message);
    } else {
      throw new Error(res.data.message || "Failed to create token.");
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Failed to create token. Try again.");
  } finally {
    setLoading(false); // Stop loading
  }
};