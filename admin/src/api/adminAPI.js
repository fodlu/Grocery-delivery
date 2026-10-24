import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// dashboard
export const getDashboard = () => API.get("/admin");

// order
export const getAllOrders = (params) => API.get("/admin/orders", { params });
export const getSingleOrders = (id) => API.get(`/admin/orders/${id}`);
export const updateOrderStatus = (id, status) =>
	API.get(`/admin/orders/${id}/status`, { orderStatus: status });
export const deleteOrders = (id) => API.get(`/admin/orders/${id}`);

// categories
export const getCategories = () => API.get("/categories");
export const getCategory = (id) => API.get(`/categories/${id}`);
export const createCategory = (data) => API.post(`/categories/add`, data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// products
export const getProducts = (params = {}) => API.get("/products", { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProducts = (data) => API.post(`/products/add`, data);
export const updateProducts = (data, id) => API.put(`/products/${id}`, data);
export const deleteProducts = (id) => API.delete(`/products/${id}`);

// hookas
export const getHookas = () => API.get("/hookas");
export const createHooka = (data) => API.post(`/hookas`, data);
export const getHooka = (id) => API.get(`/hookas/${id}`);
export const updateHooka = (data, id) => API.put(`/hookas/${id}`, data);
export const deleteHooka = (id) => API.delete(`/hookas/${id}`);

// upload hookas
export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append("image", file);

	const response = await API.post("/upload", formData);

	console.log("Upload API response: ", response.data);

	return response.data;
};

export default API;
