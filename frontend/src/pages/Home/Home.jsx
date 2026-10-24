import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchResult from "../../components/SearchResult/SearchResult";
import Banner from "../../components/Banner/Banner";
import ProductsPage from "../../components/ProductsItemPage/ProductsPage";
import HookaPage from "../../components/HookaPage/HookaPage";
import Footer from "../../components/Footer/Footer";

const Home = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const isSearching = query.trim().length > 0;
	return (
		<div>
			<Navbar />
			{isSearching ?
				<SearchResult query={query} />
			:	<>
					<Banner />
					<ProductsPage />
					<HookaPage />
				</>
			}
			<Footer />
		</div>
	);
};

export default Home;
