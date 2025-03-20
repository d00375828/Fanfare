const API_BASE_URL = "http://localhost:8080";

const ENDPOINT = `${API_BASE_URL}/order`;

export async function sendOrder(section, seat, item) {
    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, seat, item }),
    });
  return response;
};

export async function cancelOrder(id, status) {
    const response = await fetch(ENDPOINT + `/complete/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
  return response;
};