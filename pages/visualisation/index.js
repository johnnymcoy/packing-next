import Visualization from "../../components/3D/Visualization";
import VisualControls from "../../components/3D/VisualControls";

import { useSelector } from "react-redux";


export default function VisualisationPage(){

    const orders = useSelector(state => state.orders.orders);
    const results = useSelector(state => state.results.results);

    return(
<div className="canvas">
    <VisualControls />
    {/* <Visualization orders={orders} packingResults={results} /> */}
</div>
);}