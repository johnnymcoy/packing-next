import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
import {orderActions} from "../../store/orders-context";
import UploadExcel from "components/Orders/UploadExcel";
import OrderForm from "@components/Orders/OrderForm";



export default function AddOrderPage(){
    const dispatch = useDispatch();
    


    function AddOrderHandler(order){
        dispatch(orderActions.addItem(order));
    }

    function addMLOptionsHandler(){
        // AddOrderHandler(RectangularPlatter);

    }

    return(
<div>
    {/* <AddOrderItem bIsPackage={false} type="order" addOrder={AddOrderHandler} /> */}
    <OrderForm />
    <UploadExcel addOrder={AddOrderHandler}/>
    {/* <button onClick={addMLOptionsHandler}>Add ML Items</button> */}
</div>
);}