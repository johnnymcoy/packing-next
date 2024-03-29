import PackingComponent from "../components/packing/Packing";
import { useDispatch, useSelector } from "react-redux";


import {resultsActions} from "../store/results-context";


export default function ResultsPage(){
    const dispatch = useDispatch();

    const orders = useSelector(state => state.orders);
    const items = useSelector(state => state.items);

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