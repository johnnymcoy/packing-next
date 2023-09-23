import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const scriptPath = path.resolve('pages', "api", "python", "appv2.py");
// const outputPath = path.resolve('pages', "api", "python", "output.json");
// const multioutputPath = path.resolve('pages', "api", "python", "multioutput.json");

// const inputPath = path.resolve('pages', "api", "python", "input.json");
// const packagesPath = path.resolve('pages', "api", "python", "packages.json");
// const ordersPath = path.resolve('pages', "api", "python", "orders.json");

//! Update paths to use the /tmp directory
const outputPath = '/tmp/output.json';
const multioutputPath = '/tmp/multioutput.json';

const inputPath = '/tmp/input.json';
const packagesPath = '/tmp/packages.json';
const ordersPath = '/tmp/orders.json';

export default async (req, res) => {
    return new Promise((resolve, reject) => {
        const data  = req.body;
        if (!data) {
            console.log(data)
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