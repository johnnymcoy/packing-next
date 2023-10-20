import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch, useSelector } from "react-redux";
import { itemActions} from "../../store/items-context";
import UploadExcel from "components/Orders/UploadExcel";
import CustomTable from "@components/UI/CustomTable";
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import {  useState } from "react";
import Modal from "@components/UI/Modal";


export default function AddItemsPage(){
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items);

    const [addItemForm, setAddItemForm] = useState(false);

    const [addExcelForm, setAddExcelForm] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);


    function AddItemHandler(item){
        dispatch(itemActions.addItem(item));
    }

    function deleteItem(event){
        const id = event.target.id;
        console.log(id)
        dispatch(itemActions.deleteItem(id));
    }

    function openAddItemHandler(){
        setAddItemForm(prevState => !prevState);
    }
    function openAddExcelHandler(){
        setAddExcelForm(prevState => !prevState);
    }
    function addSelectedItems(){
        selectedItems.forEach((value) =>
        {
            console.log(value)
        })
    }
    function deleteSelectedItems(){
        selectedItems.forEach((value) =>
        {
            dispatch(itemActions.deleteItem(value));
        })
    }
    function selectedItemsChanged(event){
        setSelectedItems(event);
    }
    function clearItems(event){
        dispatch(itemActions.clearItems());
    }


    return(
<div>
    <Container css={{textAlign: "center", margin: "0 auto", justifyContent: "center"}}>
        <Button.Group >
            <Button onPress={openAddItemHandler}>Add New Item</Button>
            <Button onPress={addSelectedItems}>Add Selected Items To Order</Button>
            <Button onPress={openAddExcelHandler}>Upload Excel Sheet</Button>
        </Button.Group>
        <Button.Group >
            <Button onPress={deleteSelectedItems}>Delete Selected Items</Button>
            <Button onPress={clearItems}>Clear All Items</Button>
        </Button.Group>

    </Container>
    {addItemForm && 
    <Modal bHideClose>
        <h1>Add Item</h1>
        <AddOrderItem type="item" onClose={openAddItemHandler} addOrder={AddItemHandler} />
    </Modal> }
    {addExcelForm && 
    <Modal 
        onRemove={openAddExcelHandler} >
        <h1>Add Item</h1>
        <UploadExcel addOrder={AddItemHandler} />
    </Modal>}


    <CustomTable 
        onSelectionChanged={selectedItemsChanged}
        tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Weight"},{title:"Volume"},{title:"Actions"}]} 
        packages={items} 
        deleteItem={deleteItem}    
    />
    {/* <AddOrderItem bIsPackage={false} type="item" addOrder={AddOrderHandler} /> */}
    {/* <UploadExcel addOrder={AddOrderHandler}/> */}
</div>
);}