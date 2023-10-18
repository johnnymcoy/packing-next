import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
import {packageActions} from "../../store/packages-context";

export default function AddCustomPostageOptionPage(){
    const dispatch = useDispatch();
    


    function addPackageHandler(order){
        dispatch(packageActions.addItem(order));
    }


    return(
<div>
    <AddOrderItem type="package" bPacking addOrder={addPackageHandler} />
</div>
);}