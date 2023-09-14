import Visualization from "../../components/3D/Visualization";
import { useSelector } from "react-redux";


export default function VisualisationPage(){

    const orders = useSelector(state => state.orders.orders);
    const results = useSelector(state => state.results.results);
    // console.log(results)

    return(
<div className="canvas">
    <Visualization orders={orders} packingResults={results} />
</div>
);}