// credit to https://profy.dev/article/react-architecture-api-client

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(url, options) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      const error = new Error("HTTP Error");
      error.status = response.status;
      try {
        error.response = await response.json();
      } catch (err) {
        console.error(err);
        throw error;
      }
      throw error;
    }
    return response.json();
  }

  get(url) {
    const token = JSON.parse(localStorage.getItem("token"));
    return this.request(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer " + token,
      },
    });
  }

  post(url, data) {
    const token = JSON.parse(localStorage.getItem("token"));
    return this.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  }

  postFormData(url, formData, signal) {
    const token = JSON.parse(localStorage.getItem("token"));
    return this.request(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer " + token,
      },
      body: formData,
      signal,
    });
  }

  put(url, data) {
    const token = JSON.parse(localStorage.getItem("token"));
    return this.request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  }

  delete(url) {
    const token = JSON.parse(localStorage.getItem("token"));
    return this.request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: "Bearer " + token,
      },
    });
  }
}

export const apiClient = new APIClient(import.meta.env.VITE_API_URL);
