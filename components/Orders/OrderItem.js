import { Button } from '@nextui-org/react';
import Card from '../UI/Card';
import classes from './OrderItem.module.css';

const OrderItem = (props) => {
    const { name, width, height, depth, weight, amount, 
        // bIsPackage, 
        id, type } = props;
    const bIsItem = type === "item";
    const bIsOrder = type === "order";
    const bIsPackage = type === "package";

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
            {bIsOrder && <div className={classes.price}>Quantity: {amount}</div>}
        </header>
        <p>
            Width: {width},  <br />
            Height: {height},   <br />
            Depth: {depth},   <br />
            {bIsPackage ? "Max Weight" : "Weight"}: {weight} <br />
            volume: {volume}
        </p>
        {bIsOrder &&  
        <div className={classes.actions}>
            <Button auto className={classes.button} size={"sm"} onClick={removeItem}>-</Button>
            <Button auto className={classes.button} size={"sm"} onClick={addItem}>+</Button>
            <Button auto className={classes.button} size={"sm"} onClick={deleteItem}>Delete</Button>
        </div>}
        {bIsPackage &&  
        <div className={classes.actions}>
            <Button auto className={classes.button} size={"sm"} onClick={() => {}}>Edit</Button>
            <Button auto className={classes.button} size={"sm"} onClick={deleteItem}>Delete</Button>
        </div>}
        {bIsItem &&  
        <div className={classes.actions}>
            <Button auto className={classes.button} size={"sm"} onClick={() => {}}>Edit</Button>
            <Button auto className={classes.button} size={"sm"} onClick={deleteItem}>Delete</Button>
        </div>}
    
    </Card>
</li>
);};
  
export default OrderItem;
  