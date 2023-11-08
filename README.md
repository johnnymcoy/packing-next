# How to Install
Download Github Repo 

`npm install` to install all dependencies

`npm run dev` to run the website locally


create .env.local file with all the enviroment variables, or download it from google drive, `DRIVE/SOFTWARE DEVELOPMENT/CURTIS/Files/.env.local` and place the file in the root of the project

# Dependencies

React - Base Framework
Next.js - Framework build on React with full stack features

React Redux / Redux-toolkit - Sitewide states and actions

next-auth - Authentication

Three.js - In Browser 3D rendering
react-three/fiber
react-three/drei
react-three/postprocessing

Next-ui - simple UI framework

xlsx - Excel Spreadsheet data parser and writer


# Current Demo Version Online

[https://packing-johnnymcoy.vercel.app/]

# Workflow

Users have 3 main components
- Items
- Packages 
- Orders

Items are stock items, (i.e. Lamp)
Items have 
```
Name, ID, Width, Height, Depth, Weight
```

Orders are a collection of Items
```
Name, ID, Items
```

Packages are what postage options are available
Postage options have

```
Name, ID, Width, Height, Depth, Max Weight 
```

Users first add there stock items.

Then they choose which items they'd like to send, and add it to an order.

Once all the orders are done, they add which postage options they'd like.

Then calculate the results for the orders.

They can then compare the Results by Empty Volume, Cost, etc.
They can also view a 3D visual of the Items in the Postage Option.



<!-- # Structure
```
├── components
│   ├── 3D
│   │   ├── Visualizer + 3D Objects
│   ├── contact - (contact form)
│   ├── icon - (UI Icon)
│   ├── layout
|   |   ├── Navigation items
|   |   ├── Sidebar

├── pages
│   ├── api
│   │   ├── auth
|   |   ├── python
│   ├── images
│   ├── js
│   ├── index.html
├── dist (or build
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```

 -->
## Components
3D Items: 
- Visualizer 
- 3DBox 
- Visual Controls

Forms
- Contact Form
- Add Item (Used for Items, Postage, and Orders)
- Order Form
- Upload Excel

Navigation
- Mobile menu
- Side Menu
- Main Navigation bar

UI  
- Modal
- Login
- Card
- Custom Table
- Results Table



## Pages

#### Index
Home Page

#### Dashboard
WIP, to have graphs, costs, etc
#### Items
A table with all available items, forms to add items, upload excel sheets and delete items.
#### Orders
A list of all orders to be calculated
#### Postage 
All available postage options, add postage options, add preset options
#### Settings 
Change decimal places, Measurement units, etc
#### Calculate Results
Sends the data to the Packing algorigthm
#### Visual 
3D visual of a selected result
#### Feedback
Send through feedback that gets Emailed to us
#### Help
WIP
#### Version
WIP to have version history and changelog
#### Tutorials 
WIP written tutorials with screenshots on how to use


## API

#### runPythonScrips.js
This file is for running the Python locally

This file writes the incoming packing data to JSON files (input.JSON) first

Then it runs the app.py python file and waits for a response

Then it writes the response to output.JSON

### runAWSFunction.js
This file simply calls the AWS lambda function and waits for a response

## Store
Stores user data such as: Items, Order, Postage, Measurement Units, so that they can be accessed through the whole site.









# Current Version

- Bulk orders are currently working.
- AWS api is connected and working with the example data


# Current Issues

- Authentication isn't fully setup (Login/Logout)
- Setting: haven't implemented changing measurement units and weight units



# TODO 

- Technical Documents
- Clean up code


### Feedback
- Connect Contact form


### Excel
- Add in Template file for people to download 
- Export results to a excel sheet

### Pages
- Fill out Help pages

### Authentication 
- Finish setting up Logins, and a database for storing user data

### Dashboard
- Get results into a dashboard


### Email
- Connect email server to contact form
- Option to send through results to an email

### Packing Code
- Go through this github and merge some features with current code, (Floating Items fix, Load bearing limits, priority items)
[https://github.com/jerry800416/3D-bin-packing] 3D-bin-packing-master(ImprovedPyCode)


## Postage
- Add more Preset postage options

## Results
- Have options for number of boxes(only one box, two boxes etc.)
- Have limit for number of orders + results - need to limit if too many requests

## Visuals
- Show details of results in the Visual page
- Color code the different orders, and postage options

# BUGS

### Visuals
- Bug when displaying different options, outline isn't re-rendered
- When Items are rotated they aren't properly rotated around an axis, causing rotated object to apear outside the box