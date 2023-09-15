import React, { useState } from 'react';
import Card from '../components/UI/Card';
import CSS from "../styles/Packing.module.css";
import Result from 'components/results/Result';

function PackingComponent(props) {

    // TODO get the packing results first from the context to see if some already exist
    const [packingResults, setPackingResults] = useState([]);
    // const [showPackingResults, setShowPackingResults] = useState(true); //used for a button before
    const [multiResult, setMultiResult] = useState(false);

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

    
    let totalWeight = 0;
    let totalVolumeEmpty = 0;
    if(packingResults.length !== 0)
    {
        for(let i = 0; i < packingResults.length; i++)
        {
            totalWeight += Number(packingResults[i][0].bin.totalWeight);
            totalVolumeEmpty += Number(packingResults[i][0].bin.emptyVolume);
            console.log(packingResults[i][0].bin.totalWeight);
        }
    }


    return (
<Card>
    {packingResults && packingResults.map((item) =>
        <Result result={item} />
    )}



    {/* {packingResults &&  packingResults.map((item) =>
    <div className={CSS.option}>
        {item.map((innerItem) =>
        (!innerItem.bin.bIsEmpty && 
        <div key={innerItem.bin.name} 
            className={CSS.fit}>
            {innerItem.bin.name}
            <ul>
                <h4>Items:</h4>
                {innerItem.items.map((order, index) =>
                (
                    <li key={index}>{order.name}</li>
                    ))}
                <p>Total Items:{innerItem.items.length}</p>

                Total weight: {Math.abs(innerItem.bin.totalWeight)} <br />
                Volume (m3): {Math.abs(innerItem.bin.volume) / 1000000} <br />
                Box Cubic Vol Weight (m): {(Math.abs(innerItem.bin.volume) / 1000000) * 250} <br />

                Total Items volume (m3): {Math.abs(innerItem.bin.itemsVolume) / 1000000} <br />
                Volume empty (m3): {Math.abs(innerItem.bin.emptyVolume) / 1000000}
                <p>Items Left:{innerItem.bin.itemsLeft}</p>
            </ul>
        </div>))}

        <h2>Totals</h2>
        Total Weight: {totalWeight} <br />
        Total Empty Volume: {(totalVolumeEmpty).toFixed(2)} <br />
    </div>
    )}            */}




    {/* {!multiResult && packingResults.map((item) => 
        (!item.bin.bIsEmpty && 
        <div key={item.bin.name} className={item.bin.bFitEverything ? `${CSS.fit}` : `${CSS.notFit}`}>
            {item.bin.name}
            <ul>
                <h4>Items:</h4>
                {item.items.map((order, index) =>
                (
                    <li key={index}>{order.name}</li>
                ))}
                {item.bin.bFitEverything ? 
                    <div className={CSS.fit}>Everything Fit</div> :
                    <div className={CSS.notFit}> "Not all Fit"</div>}  <br/>
                Total weight: {Math.abs(item.bin.totalWeight)} <br />
                Volume (m3): {Math.abs(item.bin.volume) / 1000000} <br />
                Box Cubic Vol Weight (m): {(Math.abs(item.bin.volume) / 1000000) * 250} <br />

                Total Items volume (m3): {Math.abs(item.bin.itemsVolume) / 1000000} <br />
                Volume empty (m3): {Math.abs(item.bin.emptyVolume) / 1000000}
                <p>Items Left:{item.bin.itemsLeft}</p>
            </ul>
        </div>
    ))} */}
    <button id="single" onClick={SendPackingData}>Pack Boxes (Single Box)</button> 
    <button id="multi" onClick={SendPackingData}>Pack Boxes (Multiple Box)</button> 
    <button id="multioutput" onClick={changeMultiOutput}>{multiResult ? "MultiOutput" : "SingleOutput"}</button> 


</Card>
);}

export default PackingComponent;