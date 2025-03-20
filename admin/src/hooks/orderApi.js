const API_BASE_URL = "http://localhost:8080";

const ENDPOINT = `${API_BASE_URL}/order`;

export async function getOrders() {
    const response = await fetch(ENDPOINT, {
        method: "GET",
    });
  return response;
};

export async function acceptOrder(id) {
    const response = await fetch(ENDPOINT + `/accept/${id}`, {
        method: "PUT",
    });
  return response;
};

export async function completeOrder(id, status) {
    const response = await fetch(ENDPOINT + `/complete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
  return response;
};