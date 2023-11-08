import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';


const localPaths = {
    scriptPath:  path.resolve('pages', "api", "python", "app.py"),
    outputPath: path.resolve('pages', "api", "python", "output.json"),
    multioutputPath: path.resolve('pages', "api", "python", "multioutput.json"),
    inputPath: path.resolve('pages', "api", "python", "input.json"),
    packagesPath: path.resolve('pages', "api", "python", "packages.json"),
    ordersPath: path.resolve('pages', "api", "python", "orders.json")
}

const vercelPaths = {
    scriptPath:  path.join('pages', "api", "python", "appv2.py"),
    outputPath: path.join('/tmp', "output.json"),
    multioutputPath: path.join('/tmp', 'multioutput.json'),
    inputPath: path.join('/tmp', "input.json"),
    packagesPath: path.join('/tmp', "packages.json"),
    ordersPath: path.join('/tmp', "orders.json")
}


export default async (req, res) => {
    return new Promise((resolve, reject) => {
        const bDevelopmentMode =  process.env.NODE_ENV === "development";
        const data  = req.body;
        if (!data) {
            console.log("Server: Data sent in runPythonScripts.js Failed", data)
            return res.status(400).json({ error: 'Data is required' });
        }
        let paths = vercelPaths;
        if(bDevelopmentMode)
        {
            paths = localPaths;
        }
        // Write to /tmp/ location
        fs.writeFileSync(paths.inputPath, JSON.stringify(data));
        fs.writeFileSync(paths.ordersPath, JSON.stringify(data.orders));
        fs.writeFileSync(paths.packagesPath, JSON.stringify(data.packages));

        try {
            const stdout =  execSync(`python ${paths.scriptPath}`);
            console.log(`Python Script Output: ${stdout.toString()}`);
            if(fs.existsSync(paths.outputPath)){
                const outputData = JSON.parse(fs.readFileSync(paths.outputPath, 'utf-8'));
                res.status(200).json(outputData);
            } else {
                console.log("(runPythonScrips) FALSE")
                res.status(500).json({ error: '(runPythonScrips) Error reading output data' });
            }
            resolve();
        } catch (error) {
            console.error(`(runPythonScrips) Error executing script: ${error}`);
            res.status(500).json({ error: '(runPythonScrips) Internal Server Error' });
            resolve();
        }
    })
}
