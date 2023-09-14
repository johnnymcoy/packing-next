import { useSelector } from "react-redux";
import OrderItem from "../../components/Orders/OrderItem";
import { useDispatch } from "react-redux";
import {orderActions} from "../../store/orders-context";



export default function ShowOrderPage(){
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    // console.log(orders)

    function deleteItem(name){
        console.log("delete")
        dispatch(orderActions.deleteItem(name));
    }

    function decreaseItem(name){
        console.log("decrease")
        dispatch(orderActions.removeSingleItem(name));

    }
    function increaseItem(name){
        console.log("increase")
        dispatch(orderActions.increaseItem(name));
    }


    return(
<div>
    {
        orders && orders.map(item =>
            <OrderItem 
                key={item.name} 
                name={item.name}
                width={item.width}
                height={item.height}
                depth={item.depth}
                weight={item.weight}
                deleteItem={deleteItem}
                amount={item.amount}
                increaseItem={increaseItem}
                decreaseItem={decreaseItem}
            />
        )
    }
</div>
);}