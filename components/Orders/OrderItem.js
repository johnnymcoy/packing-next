import Card from '../UI/Card';
import classes from './OrderItem.module.css';

const OrderItem = (props) => {
    const { name, width, height, depth, weight, amount, bIsPackage, id } = props;

    function addItem(){
        props.increaseItem(name);
    }
    function removeItem(){
        props.decreaseItem(name);  
    }
    function deleteItem(){ 
        props.deleteItem(name, bIsPackage);  
    }
    const volume = width * height * depth;


    return (
<li className={classes.item}>
    <Card>
        <header>
            <h3>{name}</h3>
            <p>{id}</p>
            {!bIsPackage && <div className={classes.price}>Quantity: {amount}</div>}
        </header>
        <p>
            Width: {width},  <br />
            Height: {height},   <br />
            Depth: {depth},   <br />
            {bIsPackage ? "Max Weight" : "Weight"}: {weight} <br />
            volume: {volume}
        </p>
        {!bIsPackage &&  
        <div className={classes.actions}>
            <button onClick={removeItem}>-</button>
            <button onClick={addItem}>+</button>
            <button onClick={deleteItem}>Delete</button>
        </div>}
        {bIsPackage &&  
        <div className={classes.actions}>
            <button onClick={deleteItem}>Delete</button>
        </div>}    
    
    </Card>
</li>
);};
  
export default OrderItem;
  