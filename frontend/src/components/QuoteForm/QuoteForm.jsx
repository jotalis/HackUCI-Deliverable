import './QuoteForm.css';

function QuoteForm({quotes, setQuotes}) {
    const handleSubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData(event.target);

        // encode it into x-www-form-urlencoded
        const formBody = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            formBody.append(key, value);
        }
        console.log(formBody);

        // send the form data to backend
        const response = await fetch('/api/quote', {
            method: 'POST',
            body: formBody.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setQuotes(prevQuotes => [...prevQuotes, JSON.parse(result)]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="quote-submission-box">
                <label className="quote-submission-title" htmlFor="input-message">Quote</label>
                <input className="quote-submission-group" type="text" name="message" id="input-message" placeholder="Enter your quote" required />
            </div>
            <div className="quote-submission-box">
                <label className="quote-submission-title" htmlFor="input-name">Name</label>
                <input className="quote-submission-group" type="text" name="name" id="input-name" placeholder="Enter quotee name" required />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    )
}

export default QuoteForm;