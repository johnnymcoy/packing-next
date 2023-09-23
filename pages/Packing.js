import React, { useState } from 'react';
import Card from 'components/UI/Card';
// import CSS from "../styles/Packing.module.css";
import Result from 'components/results/Result';

function PackingComponent(props) {

    // TODO get the packing results first from the context to see if some already exist
    const [packingResults, setPackingResults] = useState([]);
    const [multiResult, setMultiResult] = useState(false);
    const [maxResults, setMaxResults] = useState(10);

    // Called once Packing is complete
    function PackingComplete(data){
        if(props.onPackingComplete)
        {
            props.onPackingComplete(data);
        }
    }
    function changeMultiOutput(){
        setMultiResult(prevState => !prevState);
    }

    // Send the data to the Python file
    function SendPackingData(event){
        if(props.orders.orders.length === 0)
        {
            //todo Add error for no packages 
            console.log("no orders");
            return;
        }
        if(props.packages.length === 0)
        {
            //todo Add error for no packages 
            console.log("no post options");
            return;
        }

        const sendData = {
            orders: props.orders.orders,
            packages: props.packages,
            method: event.target.id,
            output: multiResult ? "multi" : "" //TODO have different button 
        }
        // console.log(sendData);
        fetch('/api/runPythonScripts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then(response => response.json())
        .then(data => {
            if(multiResult)
            {
                for(let i = 0; i < data.length;i++)
                {
                    console.log("tes:", data[i])
                }
            }
            console.log('Packing results:', data);
            setPackingResults(data);
            PackingComplete(data);
        })
        .catch(error => {
            console.error('Error sending packing data:', error);
        });
    };

    function maxResultsHandler(e){
        if(e.target.value)
        {
            setMaxResults(e.target.value);
        }
    }

    return (
<div>
    {packingResults && packingResults.slice(0, maxResults).map((item, index) => 
        <Result key={index} result={item} />
    )}
    <Card>
        <button id="single" onClick={SendPackingData}>Pack Boxes (Single Box)</button> 
        {/* <button id="multi" onClick={SendPackingData}>Pack Boxes (Multiple Box)</button> 
        <button id="multioutput" onClick={changeMultiOutput}>{multiResult ? "MultiOutput" : "SingleOutput"}</button>  */}
        <label>Max results</label>
        <input onChange={maxResultsHandler} value={maxResults} type='number'/>
    </Card>


</div>
);}

export default PackingComponent;