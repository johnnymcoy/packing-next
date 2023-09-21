import CSS from "./VisualControls.module.css"

import { useSelector } from "react-redux";
import Visualization from "./Visualization";

export default function VisualControls(props){
    const orders = useSelector(state => state.orders.orders);
    const results = useSelector(state => state.results.results);
    if(results)
    {
        // console.log(results)
    }

    if(results[0])
    {
        // undefined
        console.log(results[0])
    }

    return(
<div className={CSS.main}>
        <div>Current Box: </div>
        {/* {results[0] && results[0].map((item, index) =>
            <button>Package {index + 1} {item.bin.name}</button>
        )} */}

        <Visualization orders={orders} packingResults={results}/>
</div>
)}