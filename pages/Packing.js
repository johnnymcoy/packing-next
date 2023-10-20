import React, { useState } from 'react';
import Card from 'components/UI/Card';
// import CSS from "../styles/Packing.module.css";
import Result from 'components/results/Result';
import { Button, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { Flex } from 'components/styles/flex';
import { useSession } from 'next-auth/react';

function PackingComponent(props) {
    const { data: session } = useSession()

    // TODO get the packing results first from the context to see if some already exist
    const [packingResults, setPackingResults] = useState([]);
    const [multiResult, setMultiResult] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);
    const [failedResults, setFailedResults] = useState(false);
    const [packingTime, setPackingTime] = useState(0);

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
        setFailedResults(false);
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
        const startTime = new Date();
        setLoadingResults(true);

        
        const sendData = {
            orders: props.orders.orders,
            packages: props.packages,
            method: event.target.id,
            output: multiResult ? "multi" : "", //TODO have different button 
            bDevelopmentMode:  process.env.NODE_ENV === "development"
        }
        console.log(sendData);

        if(event.target.id === "aws")
        {
            fetch('/api/runAWSFunction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('AWS results:', data);
                if(Array.isArray(data))
                {
                    data.sort((a, b) => {
                        // console.log(a)
                        const minEmptyVolumeA = Math.min(...a.map(item => parseFloat(item.bin.emptyVolume)));                
                        const minEmptyVolumeB = Math.min(...b.map(item => parseFloat(item.bin.emptyVolume)));
                        return minEmptyVolumeA - minEmptyVolumeB;
                    })
                    setPackingResults(data);
                    PackingComplete(data);
                }
                else
                {
                    setFailedResults(true);
                }
                const endTime = new Date();
                const totalTime = endTime - startTime;
                setPackingTime(totalTime);
            })
            .catch(error => {
                console.error('Error sending packing data:', error);
            });
            setTimeout(loadingComplete, 500);
            return;
        }
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
            if(Array.isArray(data))
            {
                //sort by empty volume
                // data.sort((a, b) => {
                //     console.log(a)
                //     const minEmptyVolumeA = Math.min(...a.map(item => parseFloat(item.bin.emptyVolume)));                
                //     const minEmptyVolumeB = Math.min(...b.map(item => parseFloat(item.bin.emptyVolume)));
                //     return minEmptyVolumeA - minEmptyVolumeB;
                // })
                setPackingResults(data);
                PackingComplete(data);
            }
            else
            {
                setFailedResults(true);
            }
            const endTime = new Date();
            const totalTime = endTime - startTime;
            setPackingTime(totalTime);
        })
        .catch(error => {
            console.error('Error sending packing data:', error);

        });
        setTimeout(loadingComplete, 500);
    };
    
    function loadingComplete(){
        setLoadingResults(false);

    }
    function maxResultsHandler(e){
        if(e.target.value)
        {
            setMaxResults(e.target.value);
        }
    }

    return (
<div>

    <Card>
        <Button id="single" auto
            disabled={loadingResults} onClick={SendPackingData}
            color={failedResults ? "error" : "default"}
        >
            {loadingResults && 
            <Flex justify={'center'} wrap={'wrap'} css={{ paddingTop: '0px'}}>
                <Flex justify={'center'} wrap={'wrap'} css={{ padding: '10px 0'}}>
                <Loading size="sm" color={"warning"} />
                </Flex>
                <Spacer inline/>
                <Text css={{ textAlign: "center"}} color="black">Loading..</Text>
            </Flex>}
            {!loadingResults &&
            <Flex>
                Pack Boxes 
                (Local)
            </Flex>}
            {!loadingResults && failedResults && 
            <Flex>
                &nbsp;Failed
            </Flex>}
        </Button>
        <Spacer />
        <Button id="aws" auto 
            disabled={loadingResults} onClick={SendPackingData}
            color={failedResults ? "error" : "default"}
        >
            {loadingResults && 
            <Flex justify={'center'} wrap={'wrap'} css={{ paddingTop: '0px'}}>
                <Flex justify={'center'} wrap={'wrap'} css={{ padding: '10px 0'}}>
                <Loading size="sm" color={"warning"} />
                </Flex>
                <Spacer inline/>
                <Text css={{ textAlign: "center"}} color="black">Loading..</Text>
            </Flex>}
            {!loadingResults &&
            <Flex>
                AWS Pack Box 
            </Flex>}
            {!loadingResults && failedResults && 
            <Flex>
                &nbsp;Failed
            </Flex>
            }
        </Button>
        {packingResults && <Text>Packing Total Time: {packingTime} ms</Text>}

        {/* <button id="multi" onClick={SendPackingData}>Pack Boxes (Multiple Box)</button> 
        <button id="multioutput" onClick={changeMultiOutput}>{multiResult ? "MultiOutput" : "SingleOutput"}</button>  */}
        {/* <Input label={"Max Results"} onChange={maxResultsHandler} aria-label='Max Results' value={maxResults} type='number'/> */}
    </Card>
        {packingResults && packingResults.slice(0, maxResults).map((item, index) => 
        <div key={index}>
            <h1>{item[item.length - 1].order_name}</h1>
            {item.map((innerResult, innerIndex) =>
                {
                    // console.log("Pre Inner Result", innerResult)
                if(Array.isArray(innerResult))
                {
                    innerResult.sort((a, b) => {
                        // console.log(a)
                        const minEmptyVolumeA = Math.min(...a.map(item => parseFloat(item.bin.emptyVolume)));                
                        const minEmptyVolumeB = Math.min(...b.map(item => parseFloat(item.bin.emptyVolume)));
                        return minEmptyVolumeA - minEmptyVolumeB;
                    })
                    // console.log("Inner Result", innerResult)
                    return(
                    <Result key={innerIndex} result={innerResult} />
                )}
                
                return(
                    <div key={innerIndex}>{innerResult.bin}</div>
                    // )}
                    // <div>{innerResult.bin}</div>
                )})}
            {/* <Result key={index} result={item[0]} /> */}
        </div>
    )}


</div>
);}

export default PackingComponent;