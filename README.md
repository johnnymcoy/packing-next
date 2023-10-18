# How to Install
Download Github Repo 

run `npm install`

create .env.local file with all the enviroment variables, or download it from google drive, `DRIVE/SOFTWARE DEVELOPMENT/CURTIS/Files/.env.local` and place the file in the root of the project

# Current Demo Version Online

[https://packing-johnnymcoy.vercel.app/]


# Current Version

- Currently migrating from sending a single order at a time to bulk orders, so there is Items, Orders, and Packages, which means adding items + orders, isn't fully implemented properly.

- AWS api is connected and working with the example data

# Current Issues

- Authentication isn't fully setup (Login/Logout)
- Orders are currently broken as moving to bulk orders
- Items are not used, as they were just called "Orders" before, so adding an item doesn't add it to an order




# TODO 

### Feedback
- Connect Contact form

### Orders
- Moving the orders to now being able to choose which items by ID, and send multiple orders to be packed at once


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