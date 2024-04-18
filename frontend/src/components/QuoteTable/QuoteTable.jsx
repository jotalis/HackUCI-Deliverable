import React from 'react';
import './QuoteTable.css';

function QuoteTable({quotes}) {

    // format dates from database before displaying
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="quote-table-container">
            <h1 className="quote-table-title">Recent Quotes</h1>    
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