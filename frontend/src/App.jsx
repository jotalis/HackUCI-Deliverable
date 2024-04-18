import { useState, useEffect } from "react";
import "./App.css";
import QuoteTable from "./components/QuoteTable/QuoteTable";
import Header from "./components/Header/Header";

function App() {
	
	const [quotes, setQuotes] = useState([]);

	return (
		<div className="App">
			<Header />
			<div className="card-container">
				<div className="card submit-quote-card">
					<h2>Submit a quote</h2>
					{/* TODO: implement custom form submission logic to not refresh the page */}
					<form action="/api/quote" method="post">
						<label htmlFor="input-name">Name</label>
						<input type="text" name="name" id="input-name" required />
						<label htmlFor="input-message">Quote</label>
						<input type="text" name="message" id="input-message" required />
						<button type="submit">Submit</button>
					</form>
				</div>
				<div className="card quote-card">
					<QuoteTable quotes={quotes} setQuotes={setQuotes} />
				</div>
			</div>

		</div>
	);
}

export default App;
