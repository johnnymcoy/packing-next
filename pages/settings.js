import { useDispatch } from "react-redux";
import {packageActions} from "@store/packages-context";
import CustomTable from "@components/UI/CustomTable";

export default function AddCustomPostageOptionPage(){
    const dispatch = useDispatch();
    



    return(
<div>
    <h1>Settings</h1>
    <ul>
        <li>Change Weight Units</li>
        <li>Change Measurement Units</li>

    </ul>
</div>
);}