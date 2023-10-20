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



    
    return(
<div>
    <Container css={{textAlign: "center", margin: "0 auto", justifyContent: "center"}}>
        <StyledButtonGroup  >
            <Button onPress={openAddPostageForm}>Add Postage Item</Button>
            <Button onPress={addAusPostOptionsHandler}>Add Aus Post Options</Button>
            <Button onPress={openAddPostageForm}>Clear All Items</Button>
        </StyledButtonGroup>
    </Container>
    {addPostageItem && 
    <Modal onRemove={openAddPostageForm}>
        <h1>Add Custom Postage Item</h1>
        <AddOrderItem type="package" onClose={openAddPostageForm} addOrder={addPackageHandler} />
    </Modal> }
    <CustomTable 
        tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Max Weight"},{title:"Volume"},{title:"Actions"}]} 
        packages={packages} 
        deleteItem={deleteItem}
    />

    {/* <Table
        aria-label="Example table with static content"
        css={{
            height: "auto",
            minWidth: "100%",
            // paddingTop: "6rem",
          }}    
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>Dimentions (WxHxD)</Table.Column>
        <Table.Column>Max Weight</Table.Column>
        <Table.Column>Volume</Table.Column>
        <Table.Column>Actions</Table.Column>
      </Table.Header>
      <Table.Body>
        {packages && packages.map(item => 
        <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.width} x {item.height} x {item.depth}</Table.Cell>
            <Table.Cell>{item.weight}</Table.Cell>
            <Table.Cell>{item.width * item.height * item.depth}</Table.Cell>
            <Table.Cell>
                <Tooltip
                    content="Edit item"
                    color="warning"
                    onClick={() => console.log("Edit item")}>
                    <IconButton>
                        <EditIcon size={20} fill="#979797"/>
                    </IconButton>
                </Tooltip>
                <Tooltip
                    content="Delete item"
                    color="error"
                    id={item.id}
                    >
                    <IconButton id={item.id} onClick={deleteItem}>
                        <DeleteIcon id={item.id} size={20} fill="#FF0080"/>
                    </IconButton>
                </Tooltip>
            </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table> */}
    {/* {addPostageItem && 
        <AddOrderItem type="package" onClose={openAddPostageForm} addOrder={addPackageHandler} />
    } */}
</div>
);}