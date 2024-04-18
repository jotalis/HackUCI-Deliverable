import { useState } from "react";
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
					<h1 className="card-title">Enter a Quote</h1>
					<div className="card-description">
						<p>"Words are, of course, the most powerful drug used by mankind." - Rudyard Kipling</p>
					</div>
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
