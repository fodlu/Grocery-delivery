import React from "react";
import HookaPage from "../../components/HookaPage/HookaPage";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchResult from "../../components/SearchResult/SearchResult";

const Hooka = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const isSearching = query.trim().length > 0;

	return (
		<div>
			<Navbar />
			{isSearching ?
				<SearchResult query={query} />
			:	<HookaPage expanded />}
		</div>
	);
};

export default Hooka;
