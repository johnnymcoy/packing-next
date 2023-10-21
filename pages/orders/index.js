import AddOrderItem from "../../components/Orders/AddOrderItem";
import { useDispatch, useSelector } from "react-redux";
import {orderActions} from "../../store/orders-context";
import UploadExcel from "components/Orders/UploadExcel";
import OrderForm from "@components/Orders/OrderForm";
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import Modal from "@components/UI/Modal";
import { useState } from "react";
import CustomTable from "@components/UI/CustomTable";
import BulkOrderItem from "@components/Orders/BulkOrderItem";



export default function AddOrderPage(){
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const [addExcelForm, setAddExcelForm] = useState(false);

    function AddOrderHandler(order){
        // dispatch(orderActions.addItem(order));
    }

    function addExcelHandler(){
        setAddExcelForm(prevState => !prevState);
    }


    return(
<div>
    {addExcelForm && 
    <Modal 
        onRemove={addExcelHandler} >
        <h1>Add Item</h1>
        <UploadExcel addOrder={AddOrderHandler} />
    </Modal>}

    <Container css={{textAlign: "center", margin: "0 auto", justifyContent: "center"}}>
        <Button.Group>
            <Button auto onPress={addExcelHandler}>Upload Excel </Button>
            {/* <Button onPress={"openAddPostageForm"}>Add Order</Button> */}
        </Button.Group>
    </Container>

    {orders.map((item, index) =>
        <BulkOrderItem key={index} order={item} index={index} />
    )}
</div>
);}