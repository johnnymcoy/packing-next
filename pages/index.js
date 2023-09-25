import { useState } from "react";

function HomePage(props){
    const h1Style = {
        textAlign: "center", 
    }

    // Variables    //
    const [addOrder, setAddOrder] =  useState(false);
    const [showOrders, setShowOrders] =  useState(false);
    const [showVisualization, setShowVisualization] =  useState(false);
    const [addPackage, setAddPackage] =  useState(false);
    const [showPackages, setShowPackages] =  useState(false);
    const [ orders, setOrders] = useState([]);
    const [ packages, setPackages] = useState([]);
    const [ packingResults, setPackingResults] = useState([]);

    // open Menu buttons 
    function AddBoxButtonClicked()
    {
        setAddOrder((prevState) => !prevState);
    }
    function showOrderButtonClicked()
    {
        setShowOrders((prevState) => !prevState);
    }
    function addPackageButtonClicked()
    {
        setAddPackage((prevState) => !prevState);
    }
    function showPackagesButtonClicked()
    {
        setShowPackages((prevState) => !prevState);
    }
    
    function addPackItem(newPackage){
        for(let i = 0; i < packages.length; i++)
        {
            if(packages[i].name === newPackage.name)
            {
                //TODO Add error message for same order ID, but different dimentions
                return;
            }
        }
        setPackages(prevState => [...prevState, newPackage]);        
    }

    function addOrderItem(newPackage){
        // Check if the order name is the same as any we've already added
        for(let i = 0; i < orders.length; i++)
        {
            if(orders[i].name === newPackage.name)
            {
                increaseItem(orders[i].name);
                //TODO Add error message for same order ID, but different dimentions
                return;
            }
        }
        // Add the package to the list of packages
        setOrders(prevState => [...prevState, newPackage]);        
    }

    function onPackingComplete(data){
        setPackingResults(data);
        // console.log(data);
    }

    // Add one amount to the selected item
    function increaseItem(name){
        setOrders(prevPackages => 
            prevPackages.map(pkg => 
                pkg.name === name ? { ...pkg, amount: pkg.amount + 1 } : pkg // Add 1
            )
        ); 
    }
    function decreaseItem(name){
        setOrders(prevPackages => 
            prevPackages.map(pkg => {
                if (pkg.name === name) {
                    if(pkg.amount > 0){
                        return { ...pkg, amount: pkg.amount - 1 }; // Decrease 1
                    }
                    return pkg;
                    // Old way would delete the Package if there was 0, but would be better to keep that to the delete button
                    // if (pkg.amount === 1) { 
                    //     deleteItem(name);
                    //     return pkg;  // Return the unchanged package, as deleteItem will handle its removal
                    // }
                }
                return pkg;
            })        
        );
    }
    // Remove all of the selected item
    function deleteItem(name, bIsPackage){
        if(bIsPackage)
        {
            for(let i = 0; i < packages.length; i++)
            {
                if(packages[i].name === name)
                {
                    setPackages(prevPackages => prevPackages.filter(pkg => pkg.name !== name));
                    return;
                }
            }    
        }
        else
        {
            for(let i = 0; i < orders.length; i++)
            {
                if(orders[i].name === name)
                {
                    setOrders(prevPackages => prevPackages.filter(pkg => pkg.name !== name));
                }
            }
        }
    }
    
   return(
<>
    <h1>Welcome</h1>
    <h3>How do use this application</h3>
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

    <h4>Todo</h4>
    <ul>            
        <li>Add in Excel support</li>
        <li>Bug: Wireframes on visual don't properly change when viewing different options</li>
    </ul>
</>
);}

export default HomePage;