const API_BASE_URL = "http://localhost:8080";

const ENDPOINT = `${API_BASE_URL}/item`;


export async function getItems() {
    const response = await fetch(ENDPOINT, {
        method: "GET",
    });
  return response;
};

