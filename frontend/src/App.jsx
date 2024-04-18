import { useState, useEffect } from "react";
import "./App.css";
import QuoteTable from "./components/QuoteTable/QuoteTable";
import Header from "./components/Header/Header";
import QuoteForm from "./components/QuoteForm/QuoteForm";

function App() {
	
	const [quotes, setQuotes] = useState([]);

	return (
		<div className="App">
			<Header />
			<div className="card-container">
				<div className="card submit-quote-card">
					<h1 className="card-title">Submit a quote</h1>
					<QuoteForm quotes={quotes} setQuotes={setQuotes} />
				</div>


				<div className="card quote-card">
					<h1 className="card-title">Recent Quotes</h1>   
					<QuoteTable quotes={quotes} setQuotes={setQuotes} />
				</div>
			</div>

		</div>
	);
}

export default App;
