import React from 'react';

function QuoteTable({quotes}) {

    // format dates from database before displaying
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="App">
            <h1>Recent Quotes</h1>    
            <table>
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
                            <td>{formatDate(quote.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QuoteTable;