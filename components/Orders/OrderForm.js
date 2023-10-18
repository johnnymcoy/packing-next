import { useState } from 'react';
import Card from '../UI/Card';
import { Button, Input, Spacer, useInput, Text } from '@nextui-org/react';
import { Flex } from '@components/styles/flex';
import CSS from "./OrderForm.module.css"


function InputBox(props){

    const {} = useInput();

    function InputChanged(input)
    {
        props.InputChanged(input.target.value, props.label)
    }

    return(
<div>
    <Input label={props.label} type={props.type} onChange={InputChanged} bordered clearable={props.type !== "number"} value={props.value} initialValue={props.initialValue} placeholder={props.label}></Input>  
</div>
);}


const OrderForm = (props) => {
    const { 
        // bPacking, 
         bDontReset, type } = props;

    // Variables   
    const [ PackageID, SetPackageID] = useState("");
    const [ PackageName, SetPackageName] = useState("");
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

    return (
<div className={CSS.container}>
    <Card className={CSS.card}> 
        <InputBox label={"Order ID"} type={"text"}  InputChanged={UpdatePackingSize} value={PackageID}/>
        <InputBox label={"Id"} type={"text"}  InputChanged={UpdatePackingSize} value={PackageID}/>
        <InputBox label={"Amount"} type={"number"} InputChanged={UpdatePackingSize} value={PackageAmount}/>
        <Spacer />
        <Button auto size={"sm"} onClick={addBoxClicked}>Add</Button>
    </Card>
    <Card className={CSS.preview}>
        <Text>Preview of Item</Text>
    </Card>
</div>
);
  };
  
  export default OrderForm;
  