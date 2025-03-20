const API_BASE_URL = "http://localhost:8080";

const ENDPOINT = `${API_BASE_URL}/item`;

export async function getItems() {
    const response = await fetch(ENDPOINT, {
        method: "GET",
    });
  return response;
};

export async function createItem(name, quantity, description) {
    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity, description }),
    });
  return response;
};

export async function updateQuantity(id, quantity) {
    const response = await fetch(ENDPOINT + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
    });
  return response;
};

export async function updateItem(id, name, quantity, description) {
    const response = await fetch(ENDPOINT + `/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity, description }),
    });
  return response;
};

export async function deleteItem(id) {
    const response = await fetch(ENDPOINT + `/${id}`, {
        method: "DELETE",
    });
  return response;
};