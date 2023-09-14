import PackingComponent from "../Packing";
import { useDispatch, useSelector } from "react-redux";


import {resultsActions} from "../../store/results-context";


export default function ResultsPage(){
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orders);
    const packages = useSelector(state => state.packages.packages);

    function onPackingComplete(data){
        dispatch(resultsActions.setResults(data))
    }
    
    return(
<div>
    <PackingComponent 
        orders={orders} 
        packages={packages} 
        onPackingComplete={onPackingComplete} 
    />
</div>
);}