import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

//! Version 2
// import { promises as fs, constants } from 'fs';
//! /////////

// no such file or directory, open '/var/task/tmp/input.json'

const localPaths = {
    scriptPath:  path.resolve('pages', "api", "python", "appv2.py"),
    outputPath: path.resolve('pages', "api", "python", "output.json"),
    multioutputPath: path.resolve('pages', "api", "python", "multioutput.json"),
    inputPath: path.resolve('pages', "api", "python", "input.json"),
    packagesPath: path.resolve('pages', "api", "python", "packages.json"),
    ordersPath: path.resolve('pages', "api", "python", "orders.json")
}

const vercelPaths = {
    // path.join('/tmp', 'testFile.txt')
    scriptPath:  path.join('pages', "api", "python", "appv2.py"),
    outputPath: path.join('/tmp', "output.json"),
    multioutputPath: path.join('/tmp', 'multioutput.json'),
    inputPath: path.join('/tmp', "input.json"),
    packagesPath: path.join('/tmp', "packages.json"),
    ordersPath: path.join('/tmp', "orders.json")
}

// const scriptPath = path.resolve('pages', "api", "python", "appv2.py");
// const outputPath = path.resolve('pages', "api", "python", "output.json");
// const multioutputPath = path.resolve('pages', "api", "python", "multioutput.json");

// const inputPath = path.resolve('pages', "api", "python", "input.json");
// const packagesPath = path.resolve('pages', "api", "python", "packages.json");
// const ordersPath = path.resolve('pages', "api", "python", "orders.json");

// const outputVercelPath = '/tmp/output.json';

//! Update paths to use the /tmp directory
// const outputVercelPath = path.resolve('tmp', "output.json");
// const multioutputVercelPath = path.resolve('tmp', 'multioutput.json');

// const inputVercelPath = path.resolve('tmp', "input.json");
// const packagesVercelPath = path.resolve('tmp', "packages.json");
// const ordersVercelPath = path.resolve('tmp', "orders.json");


export default async (req, res) => {
    return new Promise((resolve, reject) => {
        const bDevelopmentMode =  process.env.NODE_ENV === "development";
        console.log(bDevelopmentMode)
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


// export default async (req, res) => {
//     return new Promise((resolve, reject) => {
//         const data  = req.body;
//         if (!data) {
//             console.log("Server: Data sent in runPythonScripts.js Failed", data)
//             return res.status(400).json({ error: 'Data is required' });
//         }

//         // Write the input data to a JSON file
//         fs.writeFileSync(inputPath, JSON.stringify(data));
//         fs.writeFileSync(ordersPath, JSON.stringify(data.orders));
//         fs.writeFileSync(packagesPath, JSON.stringify(data.packages));

//         try {
//             const stdout = execSync(`python ${scriptPath}`);
//             console.log(`Python Script Output: ${stdout.toString()}`);

//             // Read the output data from the JSON file
//             if(data.output === "multi")
//             {
//                 if (fs.existsSync(multioutputPath)) {
//                 const multioutputData = JSON.parse(fs.readFileSync(multioutputPath, 'utf-8'));
//                 res.status(200).json(multioutputData);
//                 } else {
//                     res.status(500).json({ error: 'Error reading output data' });
//                 }
//                 resolve();
//             }
//             else{
//                 //TODO moving to multioutput data
//                 if (fs.existsSync(outputPath)) {
//                     const outputData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
//                     res.status(200).json(outputData);
//                 } else {
//                     res.status(500).json({ error: 'Error reading output data' });
//                 }
//             }

//             resolve();
//         } catch (error) {
//             console.error(`Error executing script: ${error}`);
//             res.status(500).json({ error: 'Internal Server Error' });
//             resolve();
//         }
//     });
// };