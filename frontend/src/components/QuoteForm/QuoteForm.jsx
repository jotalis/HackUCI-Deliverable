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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-name">Name</label>
                <input type="text" name="name" id="input-name" required />
                <label htmlFor="input-message">Quote</label>
                <input type="text" name="message" id="input-message" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default QuoteForm;