import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import freshMartLogo from "../../assets/freshmart-logo.svg";
import { adminNavbarStyles as s } from "../../assets/dummyStyles";
import {
	ChevronRight,
	LayoutDashboard,
	LogIn,
	LogOut,
	Menu,
	Package,
	PlusCircle,
	ShoppingCart,
	X,
} from "lucide-react";

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [isNavbarHidden, setIsNavbarHidden] = useState(false);
	const lastScrollY = useRef(0);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = () => {
			const stored = localStorage.getItem("freshmart_user");
			setUser(stored ? JSON.parse(stored) : null);
		};
		checkUser();
		window.addEventListener("storage", checkUser);
		return () => window.removeEventListener("storage", checkUser);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const isScrollingDown = currentScrollY > lastScrollY.current;

			setIsNavbarHidden(isScrollingDown && currentScrollY > 120);
			if (isScrollingDown) setOpen(false);
			lastScrollY.current = Math.max(currentScrollY, 0);
		};

		lastScrollY.current = window.scrollY;
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
		setIsNavbarHidden(false);
	}, [location.pathname]);

	const menuItems = [
		{ name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
		{ name: "Add Items", icon: PlusCircle, href: "/add-items" },
		{ name: "Item List", icon: Package, href: "/item-list" },
		{ name: "Add Hookah", icon: PlusCircle, href: "/add-hooka" },
		{ name: "Hooka List", icon: Package, href: "/hooka-list" },
		{ name: "Orders", icon: ShoppingCart, href: "/orders" },
	];

	const isActive = (path) => location.pathname === path;

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("freshmart-user");
		setUser(null);
		navigate("/login");
	};

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<header
			className={`${s.headerBase} ${isNavbarHidden ? s.headerHidden : s.headerVisible}`}>
			<div className='relative'>
				<div className={s.innerWrapper}>
					<div className={s.logoWrapper}>
						<div className={s.logoImageWrapper}>
							<img src={freshMartLogo} className={s.logoImage} />
						</div>
						<div className={s.logoTextWrapper}>
							<p className={s.logoLabel}>Admin Panel</p>
							<h1 className={s.logoTitle}>FreshMart</h1>
						</div>
					</div>

					<nav className={s.navLinks}>
						{menuItems.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);

							return (
								<NavLink
									key={item.name}
									to={item.href}
									className={`${s.navLinkBase} ${active ? s.navLinkActive : s.navLinkInactive}`}>
									<Icon
										className={`${s.navIconBase} ${active ? s.navIconActive : s.navIconInactive}`}
									/>
									<span className='relative'>{item.name}</span>
									<ChevronRight
										className={`${s.navChevronBase} ${active ? s.navChevronActive : s.navChevronInactive}`}
									/>
								</NavLink>
							);
						})}
					</nav>

					<div className={s.authButtons}>
						{user ?
							<button onClick={handleLogout} className={s.logoutButton}>
								<LogOut className={s.authIcon} />
								Logout
							</button>
						:	<button className={s.loginButton} onClick={handleLogin}>
								<LogIn className={s.authIcon} />
								Login
							</button>
						}
					</div>

					{/* mobile menu toogle */}

					<button
						type='button'
						onClick={() => setOpen(!open)}
						className={s.mobileToggle}>
						{open ?
							<X className={s.mobileIcon} />
						:	<Menu className={s.mobileIcon} />}
					</button>
				</div>

				{/* mobile menu */}
				{open && (
					<div className={s.mobileMenuContainer}>
						<div className={s.mobileMenuGrid}>
							{menuItems.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.href);
								return (
									<NavLink
										key={item.name}
										to={item.href}
										onClick={() => setOpen(false)}
										className={`${s.mobileNavLinkBase} ${active ? s.mobileNavLinkActive : s.mobileNavLinkInactive}`}>
										<span className={s.mobileNavLinkLeft}>
											<Icon
												className={`${s.mobileNavIcon} ${active ? s.mobileNavIconActive : s.mobileNavIconInactive}`}
											/>
											{item.name}
										</span>
										<ChevronRight className={s.mobileNavChevron} />
									</NavLink>
								);
							})}
						</div>

						{user ?
							<button
								onClick={() => {
									handleLogout();
									setOpen(false);
								}}
								className={s.mobileLogoutButton}>
								<LogOut className={s.mobileAuthIcon} />
							</button>
						:	<button
								onClick={() => {
									handleLogin();
									setOpen(false);
								}}
								className={s.mobileLoginButton}>
								<LogIn className={s.mobileAuthIcon} />
							</button>
						}
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
