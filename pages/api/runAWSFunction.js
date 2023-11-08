export default function handler(req, res) {
    const bDevelopmentMode =  process.env.NODE_ENV === "development";
    console.log(bDevelopmentMode)
    const data  = req.body;
    if (!data) {
        console.log("Server: Data sent in runAWSFunction.js Failed")
        res.status(400).json({ error: 'Data is required' });
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(process.env.AWS_HOST, requestOptions)
        .then(response => response.json())
        .then(data => res.status(200).json(data));
}

