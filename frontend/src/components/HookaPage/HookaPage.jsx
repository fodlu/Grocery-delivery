import { useEffect, useState } from "react";
import { hookahPageStyles as s } from "../../assets/dummyStyles";
import { useCart } from "../../cartContext/CartContext";
import { getHookas } from "../../api/api";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";

const HookaPage = ({ expanded = false }) => {
	const { addItem, decreaseItem, getQuantity } = useCart();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchHookas = async () => {
			try {
				const { data } = await getHookas();
				setProducts(data.hooka || []);
			} catch (error) {
				console.log(error);
			}
		};
		fetchHookas();
	}, []);

	const visibleProducts = expanded ? products : products.slice(0, 12);
	const hasMoreProducts = !expanded;

	return (
		<section className={s.section}>
			<div className={s.container}>
				<div className={s.headerWrapper}>
					<p className={s.badge}>Premium Hookas Shelf</p>
					<h1 className={s.heading}>
						Signature <span className={s.highlight}>Hooka Picks</span>{" "}
					</h1>
					<div className={s.divider} />
				</div>

				<div className={s.productGrid}>
					{visibleProducts.map((item) => {
						const cartItem = {
							cartId: `hooka-${item._id}`,
							source: "Hooka",
							category: "Hooka Products",
							id: item._id,
							productModel: "Hooka",
							image: item.image?.url,
							name: item.name,
							company: item.company,
							price: item.sellingPrice,
							oldPrice: item.oldPrice,
							size: item.size,
						};
						const quantity = getQuantity(cartItem.cartId);

						return (
							<div key={cartItem.cartId} className={s.productCard}>
								<div className={s.cardOverlay1} />
								<div className={s.cardOverlay2} />
								<div className={s.cardOverlay3} />

								<div className={s.cardContent}>
									<div className={s.imageWrapper}>
										<img
											src={item.image?.url}
											alt={item.name}
											className={s.productImage}
										/>
									</div>

									<div className={s.productInfo}>
										<h3 className={s.productName}>{item.name}</h3>
										<p className={s.productCompany}>{item.company}</p>

										<div className={s.sizeBadge}>{item.size}</div>

										<div className={s.priceContainer}>
											<div className={s.priceRow}>
												<span className={s.priceCurrent}>
													₹{item.sellingPrice}
												</span>
												<span className={s.priceOld}>₹{item.oldPrice}</span>
											</div>
										</div>

										<div className={s.actionWrapper}>
											{quantity > 0 ?
												<div className={s.quantityControls}>
													<button
														type='button'
														onClick={() => decreaseItem(cartItem.cartId)}
														className={s.qtyButton}
														aria-label={`Decrease ${item.name} quantity`}>
														<Minus size={16} />
													</button>
													<span className={s.qtyValue}>{quantity}</span>
													<button
														type='button'
														onClick={() => addItem(cartItem)}
														className={s.qtyButton}
														aria-label={`Increase ${item.name} quantity`}>
														<Plus size={16} />
													</button>
												</div>
											:	<button
													type='button'
													onClick={() => addItem(cartItem)}
													className={s.addButton}>
													<ShoppingCart size={16} />
													Add to Cart
													<ArrowRight size={16} />
												</button>
											}
										</div>
									</div>

									<div className={s.cardBottomBar} />
								</div>
							</div>
						);
					})}
				</div>

				{hasMoreProducts && (
					<div className={s.viewMoreWrapper}>
						<Link to='/hooka-products' className={s.viewMoreLink}>
							View More Products
							<ArrowRight size={18} className={s.viewMoreArrow} />
						</Link>
					</div>
				)}
			</div>
		</section>
	);
};

export default HookaPage;
