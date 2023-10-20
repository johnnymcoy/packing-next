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
    console.log(orders)



    function AddOrderHandler(order){
        dispatch(orderActions.addItem(order));
    }


    return(
<div>
    <Container css={{textAlign: "center", margin: "0 auto", justifyContent: "center"}}>
        {/* <StyledButtonGroup  >
            <Button onPress={"openAddPostageForm"}>Add Order</Button>
        </StyledButtonGroup> */}
    </Container>

    {orders.map((item, index) =>
        <BulkOrderItem key={index} order={item} index={index} />
    )}


    {/* <h1>Order 1</h1>
    <Button>Open Order</Button>
    {orders.map((item, index) =>
        <CustomTable
            key={index}
            tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Weight"},{title: "Amount"},{title:"Actions"}]}
            packages={item.items} 
            orderTable
            itemsPerPage={item.items.length}
        />
    )} */}
    {/* <CustomTable 
        tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Weight"},{title: "Volume"},{title:"Actions"}]} 
        packages={orders}
        orderTable
        itemsPerPage={8}
    /> */}

    {/* <AddOrderItem bIsPackage={false} type="order" addOrder={AddOrderHandler} /> */}
    {/* <OrderForm /> */}
    {/* <UploadExcel addOrder={AddOrderHandler}/> */}
</div>
);}