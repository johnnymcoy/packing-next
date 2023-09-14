import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
// import { layoutActions } from "@store/layout-context";
import {orderActions} from "../../store/orders-context";


export default function AddOrderPage(){
    const dispatch = useDispatch();
    


    function AddOrderHandler(order){
        dispatch(orderActions.addItem(order));
    }

    return(
<div>
    <AddOrderItem bIsPackage={false} addOrder={AddOrderHandler} />
</div>
);}