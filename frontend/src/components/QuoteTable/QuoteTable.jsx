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
            <label htmlFor="input-age" className = "filter-label">Filter: </label>
            <select id="input-age" className="quote-table-filter" selected="all" name="age filter" value={ageFilter} onChange={ageFilterChange}>
                <option value="all">All</option>
                <option value="day">1 day</option>
                <option value="week">1 week</option>
                <option value="month">1 month</option>
                <option value="year">1 year</option>
            </select> 
                <div className="table-scroll">
                    <table className="quote-table ">
                        <thead>
                            <tr>
                                <th className='quote-table-column-title'>Quote</th>
                                <th className='quote-table-column-title'>Name</th>
                                <th className='quote-table-column-title'>Date</th>
                            </tr>
                        </thead>
                                <tbody>     
                                    {quotes.map((quote, index) => (
                                        <tr className="quote-table-row-data" key={index}>
                                            <td>"{quote.message}"</td>
                                            <td>{quote.name}</td>
                                            <td>{formatDate(quote.time)}</td>
                                        </tr>
                                    ))}
                                </tbody>   
                    </table>
                </div>
        </div>
    );
}

export default QuoteTable;