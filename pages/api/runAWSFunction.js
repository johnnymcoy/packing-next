// const AWS = require('aws-sdk');
// const lambda = new AWS.Lambda();

// const params = {
//     FunctionName: process.env.AWS_ARN, //'arn:aws:lambda:ap-southeast-2:640304917098:function:Packing',
//     Payload: JSON.stringify({
//         "orders": [
//           {
//             "id": "ord1240sx",
//             "name": "Item-01",
//             "width": 0.6,
//             "depth": 2,
//             "height": 0.4,
//             "amount": 1,
//             "weight": 1
//           },
//           {
//             "id": "23598dx",
//             "name": "Item-02",
//             "width": 8,
//             "depth": 1,
//             "height": 1,
//             "amount": 6,
//             "weight": 1
//           },
//           {
//             "id": "23598dx",
//             "name": "Item-03",
//             "width": 1.45,
//             "depth": 2.65,
//             "height": 0.55,
//             "amount": 6,
//             "weight": 1
//           }
//         ],
//         "packages": [
//           {
//             "name": "Example Postage Box",
//             "width": 8,
//             "depth": 5,
//             "height": 2,
//             "maxWeight": 100
//           }
//         ],
//         "method": "single",
//         "output": "",
//         "bDevelopmentMode": false
//       }),  // Your input payload
//     InvocationType: RequestResponse 
// };

// lambda.invoke(params, (err, data) => {
//   if (err) console.error(err, err.stack);
//   else console.log(data);
// });


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
        // return res.status(200).json(data);

}

