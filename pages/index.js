const HomePage = () => {


    
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