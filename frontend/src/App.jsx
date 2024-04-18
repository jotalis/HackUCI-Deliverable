import { useState, useEffect } from "react";
import "./App.css";

function App() {
	
	const [ageFilter, setAgeFilter] = useState("all");

	const ageFilterChange = (event) => {
		console.log(event.target.value);
		setAgeFilter(event.target.value);
	}



	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<select id="input-age" selected="all" name="age filter" value={ageFilter} onChange={ageFilterChange}>
				<option value="all">All</option>
				<option value="day">1 day</option>
				<option value="week">1 week</option>
				<option value="month">1 month</option>
				<option value="year">1 year</option>
			</select>
			<div className="messages">
				<p>Peter Anteater</p>
				<p>Zot Zot Zot!</p>
				<p>Every day</p>
			</div>
		</div>
	);
}

export default App;
