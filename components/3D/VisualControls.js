import CSS from "./VisualControls.module.css"

import { useSelector } from "react-redux";
import Visualization from "./Visualization";
import { useState } from "react";

export default function VisualControls(props){
    const orders = useSelector(state => state.orders.orders);
    const results = useSelector(state => state.results.results);

    const [selectedResult, setSelectedResult] = useState(0);
    const [selectedBin, setSelectedBin] = useState(0);



    if(results)
    {
        // console.log(results)
    }

    if(results[0])
    {
        // undefined
        console.log(results[0])
    }

    function selectResultHandler(e){
        console.log(e.target.getAttribute("datakey"))
        setSelectedResult(e.target.getAttribute("datakey"));
    }
    
    function selectBinHandler(e){
        console.log(e.target.getAttribute("datakey"))
        setSelectedBin(e.target.getAttribute("datakey"));
    }


    return(
<div className={CSS.main}>
        {results && Array.isArray(results) && results.map((item, index) =>
                    <button onClick={selectResultHandler} key={index} datakey={index}>Option {index + 1}</button>
                )}

        <div>Current Box: </div>
        {Array.isArray(results[selectedResult]) && results[selectedResult].map((item, index) =>
            <button key={index} onClick={selectBinHandler} datakey={index} >Package {index + 1} {item.bin.name}</button>
        )}

        <Visualization orders={orders} packingResults={results[selectedResult][selectedBin]}/>
</div>
)}