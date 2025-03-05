export const createToken = async (setMessage) => {
  try {
    const res = await fetch("https://api-rate-limiter-backened.onrender.com/createToken", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    console.log("Server Response:", data);

    if (res.ok) {
      setMessage(data.message);
    } else {
      throw new Error(data.message || "Failed to create token.");
    }
  } catch (error) {
    setMessage(error.message || "Failed to create token. Try again.");
  }
};
