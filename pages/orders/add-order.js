import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
// import { layoutActions } from "@store/layout-context";
import {orderActions} from "../../store/orders-context";
import UploadExcel from "components/Orders/UploadExcel";

// const RectangularPlatter = {name: "Rectangular Platter", width: 46, depth: 36, height: 31, amount: 1, weight: 0.1};


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
    <AddOrderItem bIsPackage={false} addOrder={AddOrderHandler} />
    <UploadExcel addOrder={AddOrderHandler}/>
    {/* <button onClick={addMLOptionsHandler}>Add ML Items</button> */}
</div>
);}