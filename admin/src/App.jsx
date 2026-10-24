import { useLayoutEffect } from "react";
import Login from "./pages/login/Login";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddItems from "./pages/AddItems/AddItems";
import Orders from "./pages/Orders/Orders";
import AddHooka from "./pages/AddHooka/AddHooka";
import HookaList from "./pages/HookaList/HookaList";
import ItemLists from "./pages/ItemList/ItemList";

const hasAdminSession = () => {
	const token = localStorage.getItem("token");
	const savedUser = localStorage.getItem("freshmart_user");

	if (!token || !savedUser) return false;

	try {
		return JSON.parse(savedUser).role === "admin";
	} catch {
		return false;
	}
};

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	return hasAdminSession() ? children : (
			<Navigate to='/login' replace state={{ from: location }} />
		);
};

const PublicOnlyRoute = ({ children }) =>
	hasAdminSession() ? <Navigate to='/dashboard' replace /> : children;

const ScrollToTop = ({ children }) => {
	const { pathname } = useLocation();

	useLayoutEffect(() => {
		window.history.scrollRestoration = "manual";
		const root = document.documentElement;
		const previousBehavior = root.style.rootBehavior;
		root.style.scrollBehavior = "auto";
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
		root.style.scrollBehavior = previousBehavior;
	}, [pathname]);

	return null;
};

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route
					path='/login'
					element={
						<PublicOnlyRoute>
							<Login />
						</PublicOnlyRoute>
					}
				/>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/add-items'
					element={
						<ProtectedRoute>
							<AddItems />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/orders'
					element={
						<ProtectedRoute>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/item-list'
					element={
						<ProtectedRoute>
							<ItemLists />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/add-hooka'
					element={
						<ProtectedRoute>
							<AddHooka />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/hooka-list'
					element={
						<ProtectedRoute>
							<HookaList />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</>
	);
};

export default App;
