import OrderItem from "../../components/Orders/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import {packageActions} from "../../store/packages-context";
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import Modal from "@components/UI/Modal";
import AddOrderItem from "@components/Orders/AddOrderItem";
import { useState } from "react";
import CustomTable from "@components/UI/CustomTable";


export default function PostageOptionsPage(){
    const dispatch = useDispatch();
    
    const packages = useSelector(state => state.packages.packages);
    const [selectedItems, setSelectedItems] = useState([]);

    const [addPostageItem, setAddPostageItem] = useState(false);

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
        dispatch(packageActions.addMultipleOptions("AusPost"));
    }


    function deleteItem(event){
        const id = event.target.id;
        dispatch(packageActions.removeItem(id));
    }

    function openAddPostageForm(){
        setAddPostageItem(prevState => !prevState);
        console.log(addPostageItem)
    }
    function clearAllPostageItems(){
        dispatch(packageActions.clearAllItems());
    }
    function deleteSelectedItems(){
        selectedItems.forEach((value) => {
            dispatch(packageActions.removeItem(value));
            console.log(value);
    })
    }
    function selectedItemsChanged(event){
        setSelectedItems(event);
    }




    
    return(
<div>
    <Container css={{textAlign: "center", margin: "0 auto", justifyContent: "center"}}>
        <Button.Group  >
            <Button onPress={openAddPostageForm}>Add Postage Item</Button>
            <Button onPress={addAusPostOptionsHandler}>Add Aus Post Options</Button>
        </Button.Group>
        <Button.Group  >
            <Button onPress={deleteSelectedItems}>Delete Selected Items</Button>
            <Button onPress={clearAllPostageItems}>Clear All Items</Button>
        </Button.Group>
    </Container>
    {addPostageItem && 
    <Modal onRemove={openAddPostageForm}>
        <h1>Add Custom Postage Item</h1>
        <AddOrderItem type="package" onClose={openAddPostageForm} addOrder={addPackageHandler} />
    </Modal> }
    <CustomTable 
        onSelectionChanged={selectedItemsChanged}
        tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Max Weight"},{title:"Volume"},{title:"Actions"}]} 
        packages={packages} 
        deleteItem={deleteItem}
    />
</div>
);}