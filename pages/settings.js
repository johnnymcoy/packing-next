import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Spacer, Dropdown } from "@nextui-org/react";
import { useState } from "react";
import { unitActions } from "@store/units-context";

export default function AddCustomPostageOptionPage(){
    const dispatch = useDispatch();
    const decimalPlaces = useSelector(state => state.units.decimalPlaces);
    const weight = useSelector(state => state.units.weight);
    const measurement = useSelector(state => state.units.measurement);

    let initialLength = new Set(["Meters"])
    let initialWeight = new Set(["Grams"])

    switch(measurement)
    {
        case "m": 
            initialLength = new Set(["Meters"])
            break;
        case "cm": 
            initialLength = new Set(["Centimetres"])
        break;
        case "mm": 
            initialLength = new Set(["Millimeters"])
            break;
        case "ft": 
            initialLength = new Set(["Feet"])
            break;
        case "in": 
            initialLength = new Set(["Inches"])
            break;
        default: 
    }
    switch(weight)
    {
        case "kg": 
            initialWeight = new Set(["Kilogram"])
            break;
        case "g": 
            initialWeight = new Set(["Gram"])
            break;
        case "oz": 
            initialWeight = new Set(["Ounce"])
            break;
        case "lb": 
            initialWeight = new Set(["Pound"])
            break;
        default:
    }


    const [selectedLength, setSelectedLength] = useState(initialLength);
    const [selectedWeight, setSelectedWeight] = useState(initialWeight);
    const [selectedDecimal, setSelectedDecimal] = useState(decimalPlaces);


    function changeLengthUnits(){
        selectedLength.forEach((item) => 
        {
            dispatch(unitActions.changeMeasurement(item));
        })
    }
    function changeWeightUnits(){
        selectedWeight.forEach((item) => 
        {
            dispatch(unitActions.changeWeight(item));
        })
    }
    function changeDecimalPlaces(){
        dispatch(unitActions.changeDecimalPlaces(selectedDecimal))
    }

    function submitHandler(){
        changeDecimalPlaces();
        changeWeightUnits();
        changeLengthUnits();
    }


    return(
<div>
    <h1>Settings</h1>
    <Spacer /> 
    Disabled
    <Dropdown >
        <Dropdown.Button bordered>{selectedWeight}</Dropdown.Button>
            <Dropdown.Menu  aria-label="Static Actions"  color={"error"}
                selectionMode="single" selectedKeys={selectedWeight}
                onSelectionChange={setSelectedWeight}
            >
            <Dropdown.Item key="Gram">Gram (g)</Dropdown.Item>
            <Dropdown.Item key="Kilogram">Kilogram (kg)</Dropdown.Item>
            <Dropdown.Item key="Ounce">Ounce (oz)</Dropdown.Item>
            <Dropdown.Item key="Pound">Pound (lb)</Dropdown.Item>
        </Dropdown.Menu >
    </Dropdown>
    <Spacer />
    Disabled
    <Dropdown >
        <Dropdown.Button bordered>{selectedLength}</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions"  color={"error"}
                selectionMode="single" selectedKeys={selectedLength}
                onSelectionChange={setSelectedLength}
            >
            <Dropdown.Item key="Meters">Meters (M)</Dropdown.Item>
            <Dropdown.Item key="Centimetres">Centimetres (cm)</Dropdown.Item>
            <Dropdown.Item key="Millimeters">Millimeters (mm)</Dropdown.Item>
            <Dropdown.Item key="Feet">Feet (ft)</Dropdown.Item>
            <Dropdown.Item key="Inches">Inches (in)</Dropdown.Item>
        </Dropdown.Menu >
    </Dropdown>
    <Spacer />
    <Input label={"Decimal Places"} type={"number"} bordered initialValue={decimalPlaces} onChange={(e) => {setSelectedDecimal(e.target.valueAsNumber)}}/>
    <Spacer />
    <Button auto onPress={submitHandler}>Apply Settings</Button>
</div>
);}