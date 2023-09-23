// import OrderItem from '../components/Orders/OrderItem';
// import AddOrderItem from '../components/Orders/AddOrderItem';
// import Visualization from '../components/3D/Visualization';
// import PackingComponent from './Packing';

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
        {/* <div className='main'>

        <button onClick={addPackageButtonClicked}>{addPackage ? "Cancel" : "Add Post Package Option"}</button>
        {addPackage &&
            <div>
                <h2 style={h1Style}>Add Postage Option</h2>
                <AddOrderItem addOrder={addPackItem} bPacking/>
            </div>
        }
        <div>
            <button onClick={showPackagesButtonClicked}>{showPackages ? "Hide Post Options" : "Show Post Options"}</button>
            {showPackages &&
                <div>
                    <h2 style={h1Style}>List of Postage Options</h2>
                    {packages.map((item) =>
                        <OrderItem bIsPackage={true} 
                            key={item.name}
                            name={item.name}
                            width={item.width}
                            height={item.height}
                            depth={item.depth}
                            weight={item.weight}
                            deleteItem={deleteItem}                    
                        />
                    )}
                </div>
            }
        </div>
        <button onClick={AddBoxButtonClicked}>{addOrder ? "Cancel" : "Add Order"}</button>
        {addOrder &&
            <div>
                <h2 style={h1Style}>Add Order</h2>
                <AddOrderItem addOrder={addOrderItem} />
            </div>
        }

        <div>
            <button onClick={showOrderButtonClicked}>{showOrders ? "Hide Orders" : "Show Orders"}</button>
            {showOrders &&
                <div>
                    <h2 style={h1Style}>List of Orders</h2>
                {orders.map((item) => (
                    <OrderItem key={item.name} 
                        name={item.name} width={item.width} height={item.height} depth={item.depth} weight={item.weight} 
                        amount={item.amount} 
                        increaseItem={increaseItem}
                        decreaseItem={decreaseItem}
                        deleteItem={deleteItem}
                    />
                ))}
                </div>
            }
        </div>
        <PackingComponent orders={orders} packages={packages} onPackingComplete={onPackingComplete} />
    </div> */}
    {/* <Visualization orders={orders} packingResults={packingResults} /> */}
    </>
);}

export default HomePage;