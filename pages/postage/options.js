import OrderItem from "../../components/Orders/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import {packageActions} from "../../store/packages-context";


export default function PostageOptionsPage(){
    const dispatch = useDispatch();
    
    const packages = useSelector(state => state.packages.packages);

    function deleteItem(name, bIsPackage){
        dispatch(packageActions.removeItem(name));
    }

    
    return(
<div>
    {
        packages && packages.map(item =>
            <OrderItem
                type="package"
                // bIsPackage={true}
                key={item.name} 
                name={item.name}
                width={item.width}
                height={item.height}
                depth={item.depth}
                weight={item.maxWeight}
                deleteItem={deleteItem}
            />
        )
    }
</div>
);}