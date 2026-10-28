import axios from "axios";

const API = axios.create({
	// baseURL: "http://localhost:5000/api",
	baseURL: "https://grocery-delivery-server-gamma-seven.vercel.app/api",
});

API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	(error) => Promise.reject(error),
);

export const registerUser = (data) => API.post("/auth/register", data);
export const verifyEmail = (data) => API.post("/auth/verify-email", data);
export const resendOTP = (data) => API.post("/auth/resend-otp", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);

export const getProfile = () => API.get("/auth/profile");
export const getCategories = () => API.get("/categories");
export const getProducts = (params) => API.get("/products", { params });
export const getHookas = () => API.get("/hookas");

export const getAddresses = () => API.get("/address");
export const addAddress = (data) => API.post("/address/add", data);
export const updateAddress = (id, data) => API.put(`/address/${id}`, data);
export const deleteAddress = (id) => API.delete(`/address/${id}`);

export const placeOrder = (data) => API.post(`/orders/place`, data);
export const getMyOrders = () => API.get(`/orders/my-orders`);
export const cancelOrder = (id) =>
	API.put(`/orders/${id}`, { orderStatus: "Cancelled" });

export const createCheckoutSession = (order) =>
	API.post(`/payment/create-session`, { order });
export const verifyPayment = (sessionId, order) =>
	API.post(`/payment/verify-payment`, { sessionId, order });

export default API;
