import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
import { itemActions} from "../../store/items-context";
import UploadExcel from "components/Orders/UploadExcel";


export default function AddItemsPage(){
    const dispatch = useDispatch();
    


    function AddOrderHandler(item){
        dispatch(itemActions.addItem(item));
    }

    function addMLOptionsHandler(){
        // AddOrderHandler(RectangularPlatter);

    }

    return(
<div>
    <AddOrderItem bIsPackage={false} type="item" addOrder={AddOrderHandler} />
    <UploadExcel addOrder={AddOrderHandler}/>
    {/* <button onClick={addMLOptionsHandler}>Add ML Items</button> */}
</div>
);}