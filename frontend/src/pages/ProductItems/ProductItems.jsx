import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../../components/SearchResult/SearchResult";
import ProductItemsPage from "../../components/ProductItemsPage/ProductItemsPage";

const ProductItems = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams("q") || "";
	const isSearching = query.trim().length > 0;
	return (
		<div>
			<Navbar />
			{isSearching ?
				<SearchResult query={query} />
			:	<ProductItemsPage />}
		</div>
	);
};

export default ProductItems;
