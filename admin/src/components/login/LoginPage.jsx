import { useState } from "react";
import { adminLoginStyles as s } from "../../assets/dummyStyles";
import axios from "axios";
import freshMartLogo from "../../assets/freshmart-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from.pathname || "/dashboard";

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/auth/login",
				{ email, password },
			);
			if (data.success) {
				if (data.user?.role !== "admin") {
					setError("This user does not have admin access");
					return;
				}

				localStorage.setItem("token", data.token);
				localStorage.setItem("freshmart_user", JSON.stringify(data.user));
				navigate(from, { replace: true });
			}
		} catch (error) {
			setError(error.response?.data?.message || "Login failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={s.mainContainer}>
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className={s.glow1} />
				<div className={s.glow2} />
				<div className={s.glow3} />
			</div>

			<div className={s.contentWrapper}>
				<div className={s.brandHeader}>
					<div className={s.brandInner}>
						<div className={s.logoWrapper}>
							<img src={freshMartLogo} alt='logo' className={s.logoImage} />
						</div>
						<div className='leading-tight'>
							<p className={s.adminLabel}>Admin Panel</p>
							<h1 className={s.brandTitle}>FreshMart</h1>
						</div>
					</div>
				</div>

				<div className={s.card}>
					<div className={s.cardTopLine} />
					<form onSubmit={handleSubmit} className={s.form}>
						{error && (
							<div className={s.errorContainer}>
								<div className={s.errorDot} />
								{error}
							</div>
						)}
						<div className={s.fieldGroup}>
							<label className={s.fieldLabel}>
								<span className=''>Email Address</span>
							</label>
							<div className={s.fieldWrapper}>
								<div className={s.fieldGlow} />
								<div className={s.fieldInputContainer}>
									<Mail className={s.fieldIcon} />

									<input
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder='Email Address'
										className={s.fieldInput}
										required
										autoFocus
									/>
								</div>
							</div>
						</div>
						<div className={s.fieldGroup}>
							<label className={s.fieldLabel}>
								<span>Password</span>
							</label>
							<div className={s.fieldWrapper}>
								<div className={s.fieldGlow} />
								<div className={s.fieldInputContainer}>
									<Lock className={s.fieldIcon} />

									<input
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='●●●●●●●●'
										className={s.fieldInputPassword}
										required
									/>

									<button
										className={s.toggleButton}
										type='button'
										onClick={() => setShowPassword((n) => !n)}>
										{showPassword ?
											<EyeOff className={s.toggleIcon} />
										:	<Eye className={s.toggleIcon} />}
									</button>
								</div>
							</div>
						</div>

						<button
							className={s.submitButton}
							type='submit'
							disabled={isLoading}>
							<span className={s.submitInner}>
								{isLoading ?
									<>
										<div className={s.spinner} />
										SignIng in...
									</>
								:	<>
										<LogIn className={s.submitIcon} />
										Sign In
									</>
								}
							</span>
						</button>
					</form>
				</div>
			</div>

			<style>{`
				@keyframes spin-slow {
					0% {
						transform: translate(-50%, -50%) rotate(0deg);
					}
					100% {
						transform: translate(-50%, -50%) rotate(360deg);
					}
				}
				.animate-spin-slow {
					animation: spin-slow 20s linear infinite;
				}
			`}</style>
		</div>
	);
};

export default LoginPage;
