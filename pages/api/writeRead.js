import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    return new Promise((resolve, reject) => {
        const data  = req.body;
        if (!data) {
            console.log("Server: Data sent in runPythonScripts.js Failed", data)
            return res.status(400).json({ error: 'Data is required' });
        }

        // Write the input data to a JSON file
        fs.writeFileSync(inputPath, JSON.stringify(data));
        fs.writeFileSync(ordersPath, JSON.stringify(data.orders));
        fs.writeFileSync(packagesPath, JSON.stringify(data.packages));

        try {
            const stdout = execSync(`python ${scriptPath}`);
            console.log(`Python Script Output: ${stdout.toString()}`);

            // Read the output data from the JSON file
            if(data.output === "multi")
            {
                if (fs.existsSync(multioutputPath)) {
                const multioutputData = JSON.parse(fs.readFileSync(multioutputPath, 'utf-8'));
                res.status(200).json(multioutputData);
                } else {
                    res.status(500).json({ error: 'Error reading output data' });
                }
                resolve();
            }
            else{
                //TODO moving to multioutput data
                if (fs.existsSync(outputPath)) {
                    const outputData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
                    res.status(200).json(outputData);
                } else {
                    res.status(500).json({ error: 'Error reading output data' });
                }
            }

            resolve();
        } catch (error) {
            console.error(`Error executing script: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
            resolve();
        }
    });
};