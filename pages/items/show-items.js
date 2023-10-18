import { useSelector } from "react-redux";
import OrderItem from "../../components/Orders/OrderItem";
import { useDispatch } from "react-redux";
import { itemActions} from "../../store/items-context";



export default function ShowItemsPage(){
    const items = useSelector(state => state.items.items);
    const dispatch = useDispatch();

    // console.log(orders)

    function deleteItem(name){
        console.log("delete")
        dispatch(itemActions.deleteItem(name));
    }

    function decreaseItem(name){
        console.log("decrease")
        dispatch(itemActions.removeSingleItem(name));

    }
    function increaseItem(name){
        console.log("increase")
        dispatch(itemActions.increaseItem(name));
    }


    return(
<div>
    {items && items.map(item =>
            <OrderItem 
                type={"item"}
                key={item.name} 
                id={item.id}
                name={item.name}
                width={item.width}
                height={item.height}
                depth={item.depth}
                weight={item.weight}
                deleteItem={deleteItem}
                increaseItem={increaseItem}
                decreaseItem={decreaseItem}
            />
        )
    }
</div>
);}