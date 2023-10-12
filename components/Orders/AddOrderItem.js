import { useState } from 'react';
import Card from '../UI/Card';

function InputBox(props){

    function InputChanged(input)
    {
        props.InputChanged(input.target.value, props.label)
    }

    return(
        <div>
            <label>{props.label}</label>
          <input type={props.type} onChange={InputChanged} value={props.value}></input>  
        </div>
    );
}


const AddOrderItem = (props) => {
    const { bPacking, prefillData, bDontReset } = props;

    const initalName = prefillData ? prefillData.name :  (bPacking ? "Package Name" : "Item Name");
    const initalID = prefillData ? prefillData.id : (bPacking ? "Packing ID" : "Order ID");

    // Variables   
    const [ PackageID, SetPackageID] = useState(initalID);
    const [ PackageName, SetPackageName] = useState(initalName);
    const [ PackageWidth, SetPackageWidth] = useState(5);
    const [ PackageHeight, SetPackageHeight] = useState(2);
    const [ PackageDepth, SetPackageDepth] = useState(5);
    const [ PackageWeight, SetPackageWeight] = useState(2.5);
    const [ PackageAmount, SetPackageAmount] = useState(1);

    function UpdatePackingSize(value, label){
        if(label === "Width")
        {
            // SetPackageSize((prevState) => [num, prevState[1], prevState[2], prevState[3] ] )
            SetPackageWidth(value);
        }
        if(label === "Height")
        {
            SetPackageHeight(value);
        }
        if(label === "Depth")
        {
            SetPackageDepth(value);
        }
        if(label === "Weight")
        {
            SetPackageWeight(value);
        }
        if(label === "Name")
        {
            SetPackageName(value);
        }
        if(label === "Id")
        {
            SetPackageID(value);
        }
        if(label === "Amount")
        {
            SetPackageAmount(value);
        }
    }

    function addExampleData()
    {
        if(props.bPacking)
        {


            // ML Sizes
            const placemats = {name: "P-Placemats", width: 36, depth: 36, height: 8, amount: 1, weight: 100};
            const small = {name: "S-Small", width: 32, depth: 42, height: 16, amount: 1, weight: 100};
            const medium = {name: "M-Medium", width: 41, depth: 44, height: 25, amount: 1, weight: 100};
            const n = {name: "N-Medium Box2", width: 41, depth: 44, height: 50, amount: 1, weight: 100};
            const large = {name: "L-Large", width: 50, depth: 50, height: 25, amount: 1, weight: 100};
            const extraLarge = {name: "ML-Extra Large", width: 56, depth: 57, height: 46, amount: 1, weight: 100};
            const doormatSmall = {name: "DMS-Doormat Small", width: 47, depth: 77, height: 4, amount: 1, weight: 100};
            const doormatMedium = {name: "DMM-Doormat Medium", width: 62, depth: 92, height: 4, amount: 1, weight: 100};
            const doormatLarge = {name: "DML-Doormat Large", width: 47, depth: 122, height: 4, amount: 1, weight: 100};
            props.addOrder(doormatLarge);
            props.addOrder(doormatMedium);
            props.addOrder(doormatSmall);
            props.addOrder(placemats);
            props.addOrder(small);
            props.addOrder(medium);
            props.addOrder(n);
            props.addOrder(large);
            props.addOrder(extraLarge);

            const ausSmallSatchel = {name: "SS-AusPost Small Satchel", width: 35, depth: 25, height: 10, amount: 1, weight: 100};
            const ausMediumSatchel = {name: "SM-AusPost Medium Satchel", width: 27, depth: 39, height: 15, amount: 1, weight: 100};
            const ausLargeSatchel = {name: "SL-AusPost Large Satchel", width: 31, depth: 41, height: 20, amount: 1, weight: 100};
            props.addOrder(ausSmallSatchel);
            props.addOrder(ausMediumSatchel);
            props.addOrder(ausLargeSatchel);

            const SigBaby = {name: "Sig Baby", width: 16.5, depth: 16.5, height: 5, amount: 1, weight: 100};
            const SigLow = {name: "Sig Low", width: 16.5, depth: 16.5, height: 10, amount: 1, weight: 100};
            const SigMedium = {name: "Sig Medium", width: 16.5, depth: 16.5, height: 20, amount: 1, weight: 100};
            const SigTall = {name: "Sig Tall", width: 16.5, depth: 16.5, height: 26.5, amount: 1, weight: 100};
            const Bedrock = {name: "Bedrock", width: 48, depth: 24, height: 11, amount: 1, weight: 100};
            const mc210 = {name: "mc210", width: 21, depth: 21, height: 21, amount: 1, weight: 100};
            const smallShell = {name: "small shell", width: 28, depth: 22, height: 11.5, amount: 1, weight: 100};
            const A4 = {name: "A4", width: 30.5, depth: 21.5, height: 28, amount: 1, weight: 100};
            const MCLittleKev = {name: "MC Little Kev", width: 35, depth: 35, height: 21, amount: 1, weight: 100};
            const CMF = {name: "CMF", width: 35, depth: 30, height: 36, amount: 1, weight: 100};
            const NewTwinBaxter = {name: "New Twin Baxter", width: 36, depth: 27, height: 18, amount: 1, weight: 100};
            const PF2832 = {name: "PF283/2", width: 40, depth: 28.3, height: 18.5, amount: 1, weight: 100};
            const PF2834 = {name: "PF283/4", width: 40, depth: 28.3, height: 28.3, amount: 1, weight: 100};
            const Woodchick = {name: "Woodchick", width: 50, depth: 30, height: 28, amount: 1, weight: 100};
            const WWW = {name: "WWW", width: 60, depth: 40, height: 25, amount: 1, weight: 100};
            const Han1 = {name: "Han 1", width: 60, depth: 40, height: 35, amount: 1, weight: 100};
            const NewShipper36 = {name: "New Shipper 36", width: 60, depth: 50, height: 50, amount: 1, weight: 100};
            const Shipper11 = {name: "Shipper 1.1", width: 70, depth: 40, height: 30, amount: 1, weight: 100};
            const Eager = {name: "Eager", width: 72, depth: 32, height: 37, amount: 1, weight: 100};

            props.addOrder(SigBaby);
            props.addOrder(SigLow);
            props.addOrder(SigMedium);
            props.addOrder(SigTall);
            props.addOrder(Bedrock);
            props.addOrder(mc210);
            props.addOrder(smallShell);
            props.addOrder(A4);
            props.addOrder(MCLittleKev);
            props.addOrder(CMF);
            props.addOrder(NewTwinBaxter);
            props.addOrder(PF2832);
            props.addOrder(PF2834);
            props.addOrder(Woodchick);
            props.addOrder(WWW);
            props.addOrder(Han1);
            props.addOrder(NewShipper36);
            props.addOrder(Shipper11);
            props.addOrder(Eager);
        }
        else
        {
        }
    }


    function addBoxClicked()
    {
        //todo Check if values are 0

        if(PackageName === "")
        {
            // invalid Name
            return;
        }
        // Add all values into 1 variable
        const newPackage = {
            id: PackageID,
            name: PackageName,
            width: PackageWidth, 
            depth: PackageDepth, 
            height: PackageHeight, 
            weight: PackageWeight,
            amount: 1 
        }
        // Add the package to the list of packages
        if(PackageAmount > 1)
        {
            for(let i = 0; i < PackageAmount; i++)
            {
                props.addOrder(newPackage);
            }
        }
        else
        {
            props.addOrder(newPackage);
        }
        if(bDontReset)
        {
            
        }
        else
        {
            ResetValues();
        }
    }

    function ResetValues(){
        SetPackageID(initalID);
        SetPackageDepth(0);
        SetPackageHeight(0);
        SetPackageName(initalName);
        SetPackageWeight(0);
        SetPackageWidth(0);
        SetPackageAmount(1);
    }

    return (
<Card>
    <InputBox label={"Id"} type={"text"} InputChanged={UpdatePackingSize} value={PackageID}/>
    <InputBox label={"Name"} type={"text"} InputChanged={UpdatePackingSize} value={PackageName}/>
    <InputBox label={"Width"} type={"number"} InputChanged={UpdatePackingSize} value={PackageWidth}/>
    <InputBox label={"Height"} type={"number"} InputChanged={UpdatePackingSize} value={PackageHeight}/>
    <InputBox label={"Depth"} type={"number"} InputChanged={UpdatePackingSize} value={PackageDepth}/>
    <InputBox label={"Weight"} type={"number"} InputChanged={UpdatePackingSize} value={PackageWeight}/>
    <InputBox label={"Amount"} type={"number"} InputChanged={UpdatePackingSize} value={PackageAmount}/>

    <button onClick={addBoxClicked}>Add</button>
    {/* {!props. && <button onClick={addExampleData}>Add Example Data</button>} */}
    {/* <button onClick=bPacking{addExampleData}>Add Random Data</button> */}
</Card>
);
  };
  
  export default AddOrderItem;
  