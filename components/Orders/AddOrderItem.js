import { useState } from 'react';
import Card from '../UI/Card';
import { Button, Input, Spacer, StyledButtonGroup, useInput } from '@nextui-org/react';
import CSS from "./AddOrderItem.module.css"
function InputBox(props){

    const {} = useInput();

    function InputChanged(input)
    {
        props.InputChanged(input.target.value, props.label)
    }

    return(
<div>
    {/* <label>{props.label}</label> */}
    <Input label={props.label} type={props.type} onChange={InputChanged} bordered clearable={props.type !== "number"} value={props.value} initialValue={props.initialValue} placeholder={props.label}></Input>  
</div>
);}


const AddOrderItem = (props) => {
    const { 
        onClose,
        // bPacking, 
        prefillData, bDontReset, type } = props;
    const bIsItem = type === "item";
    const bIsOrder = type === "order";
    const bIsPackage = type === "package";

    let initialName = prefillData ? prefillData.name : (type + " name");
    
    let initialID = prefillData ? prefillData.id : (type + " ID");
    let initialWeight = 2.5;
    if(bIsPackage){initialWeight = 100;}

    // Variables   
    const [ PackageID, SetPackageID] = useState(initialID);
    const [ PackageName, SetPackageName] = useState(initialName);
    const [ PackageWidth, SetPackageWidth] = useState(5);
    const [ PackageHeight, SetPackageHeight] = useState(2);
    const [ PackageDepth, SetPackageDepth] = useState(5);
    const [ PackageWeight, SetPackageWeight] = useState(initialWeight);
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
        SetPackageID("");
        SetPackageDepth(0);
        SetPackageHeight(0);
        SetPackageName("");
        SetPackageWeight(0);
        SetPackageWidth(0);
        SetPackageAmount(1);
    }

    function closeFormHandler(){
        onClose();
    }

    return (
<Card className={CSS.card}> 
    <InputBox label={"Id"} type={"text"}  InputChanged={UpdatePackingSize} value={PackageID}/>
    <InputBox label={"Name"} type={"text"}  InputChanged={UpdatePackingSize} value={PackageName}/>
    <InputBox label={"Width"} type={"number"} InputChanged={UpdatePackingSize} value={PackageWidth}/>
    <InputBox label={"Height"} type={"number"} InputChanged={UpdatePackingSize} value={PackageHeight}/>
    <InputBox label={"Depth"} type={"number"} InputChanged={UpdatePackingSize} value={PackageDepth}/>
    {/* <input type={"color"} /> */}

    {bIsItem &&
        <InputBox label={"Weight"} type={"number"} InputChanged={UpdatePackingSize} value={PackageWeight}/>
    }

    {bIsPackage &&
        <InputBox label={"Max Weight"} type={"number"} InputChanged={UpdatePackingSize} value={PackageWeight}/>
    }
    {/* {bIsPackage &&
        <InputBox label={"Amount"} type={"number"} InputChanged={UpdatePackingSize} value={PackageAmount}/>
    } */}
    {bIsOrder &&
        <InputBox label={"Amount"} type={"number"} InputChanged={UpdatePackingSize} value={PackageAmount}/>
    }
    <Spacer />
    {!onClose &&
    <Button auto size={"sm"} onPress={addBoxClicked}>Add</Button>
    }
    {onClose && 
        <StyledButtonGroup>
            <Button auto size={"sm"} onPress={addBoxClicked}>Add</Button>
            <Button auto size={"sm"} onPress={closeFormHandler}>Close</Button>
        </StyledButtonGroup>}
</Card>
);
  };
  
  export default AddOrderItem;
  