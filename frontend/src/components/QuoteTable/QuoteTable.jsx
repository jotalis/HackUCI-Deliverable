import { useState, useEffect } from 'react';
import './QuoteTable.css';

function QuoteTable({quotes, setQuotes}) {

    // handle age filter states
    const [ageFilter, setAgeFilter] = useState("all");

	const ageFilterChange = (event) => {
		console.log(event.target.value);
		setAgeFilter(event.target.value);
	}

	useEffect(() => {
		fetch(`/api/retrieve?max_age=${ageFilter}`)
		.then(response => response.json())
		.then(data => setQuotes(data))
	}, [ageFilter]);

    // format dates from database before displaying
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    return (
        <div className="quote-table-container">
            <h1 className="quote-table-title">Recent Quotes</h1>   
            <select id="input-age" className="quote-table-filter" selected="all" name="age filter" value={ageFilter} onChange={ageFilterChange}>
                <option value="all">All</option>
                <option value="day">1 day</option>
                <option value="week">1 week</option>
                <option value="month">1 month</option>
                <option value="year">1 year</option>
            </select> 
            <table className="quote-table">
                <thead>
                    <tr>
                        <th>Quote</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote, index) => (
                        <tr key={index}>
                            <td>"{quote.message}"</td>
                            <td>{quote.name}</td>
                            <td>{formatDate(quote.time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuoteTable;