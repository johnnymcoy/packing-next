import CSS from "./ResultBin.module.css"

export default function ResultBin({data}){
    if(data.bin.bIsEmpty)
    {
        return
    }
    return(
<div key={data.bin.name} 
    className={CSS.fit}>
    <h1 className={CSS.title}>{data.bin.name}</h1>
    <ul className={CSS.bin}>
        <h4>Items:</h4>
        {data.items.map((order, index) =>
        (
            <li className={CSS.item} key={index}>{order.name}</li>
            ))}
        <p>Items: {data.items.length}</p>
        Dimentions Depth/Width/Height(m): {(data.bin.depth) / 100} x {(data.bin.width) /100} x {(data.bin.height) /100} <br />
        Total weight: {Math.abs(data.bin.totalWeight)} <br />
        Volume (m3): {Math.abs(data.bin.volume) / 1000000} <br />
        Box Cubic Vol Weight (m): {(Math.abs(data.bin.volume) / 1000000) * 250} <br />

        Total Items volume (m3): {Math.abs(data.bin.itemsVolume) / 1000000} <br />
        Volume empty (m3): {Math.abs(data.bin.emptyVolume) / 1000000}
        <p>Items Left:{data.bin.itemsLeft}</p>
    </ul>
</div>


)}