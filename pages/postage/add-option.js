import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch } from "react-redux";
import {packageActions} from "../../store/packages-context";
import { Button } from "@nextui-org/react";

const MLOptions = [
    {
        name: "P-Placemats", width: 36, depth: 36, height: 8, amount: 1, weight: 100
    },
    {
        name: "S-Small", width: 32, depth: 42, height: 16, amount: 1, weight: 100
    },
    {
        name: "M-Medium", width: 41, depth: 44, height: 25, amount: 1, weight: 100
    },
    {
        name: "N-Medium Box2", width: 41, depth: 44, height: 50, amount: 1, weight: 100
    },
    {
        name: "L-Large", width: 50, depth: 50, height: 25, amount: 1, weight: 100
    },
    {
        name: "ML-Extra Large", width: 56, depth: 57, height: 46, amount: 1, weight: 100
    },
    {
        name: "DMS-Doormat Small", width: 47, depth: 77, height: 4, amount: 1, weight: 100
    },
    {
        name: "DMM-Doormat Medium", width: 62, depth: 92, height: 4, amount: 1, weight: 100
    },
    {
        name: "DML-Doormat Large", width: 47, depth: 122, height: 4, amount: 1, weight: 100
    },
    {
        name: "SS-AusPost Small Satchel", width: 35, depth: 25, height: 10, amount: 1, weight: 100
    },
    {
        name: "SM-AusPost Medium Satchel", width: 27, depth: 39, height: 15, amount: 1, weight: 100
    },
    {
        name: "SL-AusPost Large Satchel", width: 31, depth: 41, height: 20, amount: 1, weight: 100
    }
]


const AusPostOptions = [
    {name: "Sig Baby", width: 16.5, depth: 16.5, height: 5, amount: 1, weight: 100},
    {name: "Sig Low", width: 16.5, depth: 16.5, height: 10, amount: 1, weight: 100},
    {name: "Sig Medium", width: 16.5, depth: 16.5, height: 20, amount: 1, weight: 100},
    {name: "Sig Tall", width: 16.5, depth: 16.5, height: 26.5, amount: 1, weight: 100},
    {name: "Bedrock", width: 48, depth: 24, height: 11, amount: 1, weight: 100},
    {name: "mc210", width: 21, depth: 21, height: 21, amount: 1, weight: 100},
    {name: "small shell", width: 28, depth: 22, height: 11.5, amount: 1, weight: 100},
    {name: "A4", width: 30.5, depth: 21.5, height: 28, amount: 1, weight: 100},
    {name: "MC Little Kev", width: 35, depth: 35, height: 21, amount: 1, weight: 100},
    {name: "CMF", width: 35, depth: 30, height: 36, amount: 1, weight: 100},
    {name: "New Twin Baxter", width: 36, depth: 27, height: 18, amount: 1, weight: 100},
    {name: "PF283/2", width: 40, depth: 28.3, height: 18.5, amount: 1, weight: 100},
    {name: "PF283/4", width: 40, depth: 28.3, height: 28.3, amount: 1, weight: 100},
    {name: "Woodchick", width: 50, depth: 30, height: 28, amount: 1, weight: 100},
    {name: "WWW", width: 60, depth: 40, height: 25, amount: 1, weight: 100},
    {name: "Han 1", width: 60, depth: 40, height: 35, amount: 1, weight: 100},
    {name: "New Shipper 36", width: 60, depth: 50, height: 50, amount: 1, weight: 100},
    {name: "Shipper 1.1", width: 70, depth: 40, height: 30, amount: 1, weight: 100},
    {name: "Eager", width: 72, depth: 32, height: 37, amount: 1, weight: 100},
]


export default function AddPostageOptionPage(){
    const dispatch = useDispatch();
    


    function addPackageHandler(postOption){
        if(Array.isArray(postOption))
        {
            for(let i = 0; i < postOption.length; i++)
            {
                dispatch(packageActions.addItem(postOption[i]));
            }
        }
        else
        {
            dispatch(packageActions.addItem(postOption));
        }
    }


    function addAusPostOptionsHandler(){
        addPackageHandler(AusPostOptions);
    }
    function addStarTrekOptionsHandler(){
        console.log("Add Star Trek Options");
    }

    function addMLOptionsHandler(){
        addPackageHandler(MLOptions);
    }

    return(
<div>
    <Button onClick={addAusPostOptionsHandler}>Add Aus Post Options</Button>
    {/* <button onClick={addStarTrekOptionsHandler} disabled>Add Star Trek Options</button>
    <button onClick={addMLOptionsHandler}>Add ML Options</button> */}
</div>
);}