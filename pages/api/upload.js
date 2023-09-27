// import { createRouter } from 'next-connect';
// import multer from 'multer';
// import xlsx from 'xlsx';

// // Define the CORS middleware
// // const cors = (req, res, next) => {
// //     // Set CORS headers
// //     res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this to restrict to specific domains
// //     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Adjust this to the methods your API route supports
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
// //     // Handle preflight request
// //     if (req.method === 'OPTIONS') {
// //       res.status(200).end();
// //       return;
// //     }
// //     next();
// //   };
  

// // const handler = createRouter();
// // // handler.use(cors); // Apply cors middleware
// // const upload = multer({
// //     storage: multer.memoryStorage(),
// //   });
  
// // handler.use(upload.single('file'));


// // handler.post(async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).send('No file uploaded');
// //     }
// //     // const buffer = req.file.buffer; // You can write the buffer to the filesystem or pass it to Python code.
// //     // // TODO: Handle the uploaded file buffer
    
// //     // Read the Excel file from the buffer
// //     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    
// //     // Get the first sheet name
// //     const sheetName = workbook.SheetNames[0];
// //     // Get the worksheet
// //     const worksheet = workbook.Sheets[sheetName];
// //     // Convert the worksheet to JSON
// //     const data = xlsx.utils.sheet_to_json(worksheet);

// //     res.status(200).json(data);
// //     } catch (error) {
// //     console.error('Error handling file upload', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });



// const cors = (handler) => async (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
//     if (req.method === 'OPTIONS') {
//       res.status(200).end();
//       return;
//     }
  
//     return handler(req, res); // Call the actual handler
//   };



// // Define your API route handler with CORS middleware
// const uploadHandler = async (req, res) => {
//     try {
//         if (!req.body) {
//             return res.status(400).send('No file uploaded');
//         }
//     }   catch (error) {
//         console.error('Error handling file upload', error);
//         res.status(500).send('Internal Server Error');
//     }
//     console.log(xlsx.read(req.body))
//     // const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//     const workbook = xlsx.read(req.body);
//     // // Get the first sheet name
//     const sheetName = workbook.SheetNames[0];
//     // // Get the worksheet
//     const worksheet = workbook.Sheets[sheetName];
//     // // Convert the worksheet to JSON
//     const data = xlsx.utils.sheet_to_json(worksheet);


//     res.status(200).json(data);
// };
// // export default cors(handler); 
// export default cors(uploadHandler);
// import { createRouter } from 'next-connect';
// import multer from 'multer';
// import xlsx from 'xlsx';

// const upload = multer({ storage: multer.memoryStorage() });

// const corsMiddleware = async (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
//     if (req.method === 'OPTIONS') {
//       res.status(200).end();
//       return;
//     }
    
//     return next(); // Call the next middleware or handler
// //   };
// const handler = createRouter();

// handler.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     if (req.method === 'OPTIONS') {
//       res.status(200).end();
//       return;
//     }
//     next();
//   });
// const cors = (handler) => async (req, res) => {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
//     if (req.method === 'OPTIONS') {
//       res.status(200).end();
//       return;
//     }
  
//     return handler(req, res); // Call the actual handler
// };
// handler.use(cors); // Apply CORS middleware
// handler.use(upload.single('file')); // Apply multer middleware

// handler.post(async (req, res) => {
//     console.log("Heeloo");
//     try {
//         if (!req.file) {
//             return res.status(400).send('No file uploaded');
//         }
//         const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//         // console.log(workbook)
//         const sheetName = workbook.SheetNames[0];
//         // // Get the worksheet
//         const worksheet = workbook.Sheets[sheetName];
//         // // Convert the worksheet to JSON
//         const data = xlsx.utils.sheet_to_json(worksheet);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.error('Error handling file upload', error);
//         res.status(500).send('Internal Server Error');
//     }
//     const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//     // console.log(workbook)
//     const sheetName = workbook.SheetNames[0];
//     // // Get the worksheet
//     const worksheet = workbook.Sheets[sheetName];
//     // // Convert the worksheet to JSON
//     const data = xlsx.utils.sheet_to_json(worksheet);
//     return res.status(200).json(data);
// });
// // console.log(handler);
// export default handler.handler({
//     onError: (err, req, event) => {
//     console.error(err.stack);
//     return new NextResponse("Something broke!", {
//         status: err.statusCode || 500,
// });}})


//! Version 3

import { createRouter } from 'next-connect';
import multer from 'multer';
import xlsx from 'xlsx';

const upload = multer({ storage: multer.memoryStorage() });
const router = createRouter();

router.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

router.use(upload.single('file'));

// Apply multer middleware
router.use(upload.single('file'), (req, res, next) => {
    console.log('Multer received file:', req.file); // Log the file received by multer
    console.log('Multer received fields:', req.body); // Log any other fields received by multer
    next();
});

// Apply CORS middleware
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});


// router.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         console.error('Multer error:', err);
//         return res.status(400).send('Error uploading file');
//     }
//     next(err);
// });
// Define POST handler
router.post(async (req, res) => {
    console.log(req.file)
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error handling file upload', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

//! Test Version

// import { createRouter } from 'next-connect';
// import multer from 'multer';

// const upload = multer({ storage: multer.memoryStorage() });

// const apiRoute = createRouter({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('file'));

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'success' });
// });

// export default apiRoute;