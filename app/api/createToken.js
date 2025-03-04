export const createToken = async (setMessage) => {
  try {
    const res = await fetch("http://192.168.1.74:8000/createToken", {
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
