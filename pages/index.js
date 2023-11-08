import { Button, Link } from "@nextui-org/react";

const HomePage = () => {


    
   return(
<>
    <h1>Welcome</h1>

    <h3>Latest</h3>
    <ul>
        <li>AWS api is connected and working with the example data</li>
        <li>Current Version is hosted at: </li><Button auto><Link href={"https://packing-johnnymcoy.vercel.app/"}>Vercel</Link></Button>
    </ul>
    <h3>Current Issues</h3>
    <ul>
        <li>Authentication isn't fully setup (Login/Logout)</li>
    </ul>

    <h2>Old Version</h2>
    <h4>Orders</h4>
    <p>The application comes with some default orders already in the orders tab as well as a postage option.</p>
    <p>The orders are in the ShowOrders tab, when adding a new order, it needs to be named something different than the other orders.</p>
    <h4>Postage</h4>
    <p>The Postage options show all the available boxes that can be packed into.</p>
    <p>Add postage options has a couple of preset boxes that I have already put in and will add them all to the postage options.</p>
    <p>Add custom postage options is where you can add the dimentions of your own box.</p>
    <h4>Results</h4>
    <p>Once you have your correct orders and the correct postage options, you can click on calculate results to get a list of all available options.</p>
    <p>You can also select the amount of results you'd like displayed, as the more postage options available, 
        the more results you will get.(this is only visual, as all results are calcualted at once)</p>

    <h4>Visualisation</h4>
    <p>Once the results are calcualted you can see how they would be placed inside the postage options.</p>
    <p>Note: There is still some bugs with the visual as some of the rotational directions haven't been accounted for.</p>

    <h2>Todo</h2>
    <h4>Feedback</h4>
    <ul>            
        <li>Connect Contact form</li>
    </ul>
    <h4>Orders</h4>
    <ul>            
        <li>Moving the orders to now being able to choose which items by ID, and send multiple orders to be packed at once</li>
    </ul>
    <h4>Excel</h4>
    <ul>            
        <li>Add in Template file for people to download</li>
        <li>Export results to a excel sheet</li>
    </ul>
    <h4>Pages</h4>
    <ul>            
        <li>Fill out Help pages</li>
    </ul>
    <h4>Authentication</h4>
    <ul>            
        <li>Finish setting up Logins, and a database for storing user data</li>
    </ul>
    <h4>Dashboard</h4>
    <ul>            
        <li>Get results into a dashboard</li>
    </ul>
    <h4>Email</h4>
    <ul>            
        <li>Connect email server to contact form</li>
        <li>Option to send through results to an email</li>
    </ul>
    <h4>Packing Code</h4>
    <ul>            
        <li>Go through this github and merge some features with current code, (Floating Items fix, Load bearing limits, priority items)</li>
        <li>[https://github.com/jerry800416/3D-bin-packing] 3D-bin-packing-master(ImprovedPyCode)</li>
    </ul>
    <h4>Postage</h4>
    <ul>            
        <li>Add more Preset postage options</li>
    </ul>
    <h4>Results</h4>
    <ul>            
        <li>Have options for number of boxes(only one box, two boxes etc.)</li>
        <li>Have limit for number of orders + results - need to limit if too many requests</li>
    </ul>
    <h4>Visuals</h4>
    <ul>            
        <li>Show details of results in the Visual page</li>
        <li>Color code the different orders, and postage options</li>
    </ul>
    <h2>Bugs</h2>
    <h4>Visuals</h4>
    <ul>            
        <li>Bug when displaying different options, outline isn't re-rendered</li>
        <li>When Items are rotated they aren't properly rotated around an axis, causing rotated object to apear outside the box</li>
    </ul>

</>
);}

export default HomePage;