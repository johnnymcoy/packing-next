

import Card from "components/UI/Card"
import CSS from "./ResultBin.module.css"

export default function ResultBin(props){
    const {data} = props

    if(data.bin.bIsEmpty)
    {
        return
    }
    return(
<div key={data.bin.name} 
    className={CSS.fit}>
    {data.bin.name}
    <ul>
        <h4>Items:</h4>
        {data.items.map((order, index) =>
        (
            <li key={index}>{order.name}</li>
            ))}
        <p>Total Items:{data.items.length}</p>

        Total weight: {Math.abs(data.bin.totalWeight)} <br />
        Volume (m3): {Math.abs(data.bin.volume) / 1000000} <br />
        Box Cubic Vol Weight (m): {(Math.abs(data.bin.volume) / 1000000) * 250} <br />

        Total Items volume (m3): {Math.abs(data.bin.itemsVolume) / 1000000} <br />
        Volume empty (m3): {Math.abs(data.bin.emptyVolume) / 1000000}
        <p>Items Left:{data.bin.itemsLeft}</p>
    </ul>
</div>


)}