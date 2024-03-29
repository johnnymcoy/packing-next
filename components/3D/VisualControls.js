import CSS from "./VisualControls.module.css"

import { useSelector } from "react-redux";
import Visualization from "./Visualization";
import { useState } from "react";
import { Button, Spacer } from "@nextui-org/react";

export default function VisualControls(props){
    const orders = useSelector(state => state.orders.orders);
    const results = useSelector(state => state.results.results);

    const [selectedResult, setSelectedResult] = useState(0);
    const [selectedBin, setSelectedBin] = useState(0);

    function selectResultHandler(e){
        // console.log(e.target.getAttribute("datakey"))
        setSelectedResult(e.target.getAttribute("datakey"));
    }
    
    function selectBinHandler(e){
        // console.log(e.target.getAttribute("datakey"))
        setSelectedBin(e.target.getAttribute("datakey"));
    }


    return(
<div className={CSS.main}>
    <div className={CSS.controls}>
        {results && Array.isArray(results) && results.map((item, index) =>
                    <Button auto onClick={selectResultHandler} key={index} datakey={index}>{item[1] && item[1].order_name}</Button>
            )}
        
        <div>Current Box: </div>
        {Array.isArray(results[selectedResult]) && results[selectedResult][0].map((item, index) =>
            <Button  key={index} onClick={selectBinHandler} datakey={index} >Package {index + 1} {item.bin.name}</Button>
        )}
    </div>
    {Array.isArray(results[selectedResult]) &&
    <Visualization orders={orders} packingResults={results[selectedResult][0][selectedBin]}/>
    }

</div>
)}