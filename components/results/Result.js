import Card from "components/UI/Card"
import CSS from "./Result.module.css"
import ResultBin from "./ResultBin"
 
export default function Result(props){
    const {result} = props
    // console.log(result)
    let totalWeight = 0;
    let totalVolumeEmpty = 0;
    let totalItems = 0;
    let totalCubicVolWeight = 0;
    let totalItemsVolume = 0;
    let totalBinVolume = 0;
    if(result.length !== 0)
    {
        for(let i = 0; i < result.length; i++)
        {
            //TODO calculate Units  Currently only Cubic weight has
            totalWeight += Number(result[i].bin.totalWeight);
            totalVolumeEmpty += Number(result[i].bin.emptyVolume);
            totalItems += Number(result[i].items.length);
            totalCubicVolWeight += Number((result[i].bin.volume / 1000000) * 250);
            totalItemsVolume += Number(Math.abs(result[i].bin.itemsVolume));
            totalBinVolume += (Math.abs(result[i].bin.volume));
        }
    }

    return (
<Card>
    <div className={CSS.option}>
        {result && result.map((item, index) =>
           <ResultBin key={index} data={item} />      
        )}
    </div>
    <div>
        <h2>Totals</h2>
        Total Weight: {totalWeight} <br />
        Total Item Volume: {totalItemsVolume} <br />
        Total Packing Volume: {totalBinVolume} <br />
        Total Empty Volume: {(totalVolumeEmpty).toFixed(2)} <br />
        Total Items: {totalItems} <br />
        {/* Total Cubic Vol Weight {totalCubicVolWeight} <br /> */}
    </div>
</Card>
)}

