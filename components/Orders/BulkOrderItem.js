import CustomTable from "@components/UI/CustomTable";
import { Button, Card } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "@store/orders-context";




export default function BulkOrderItem(props){
    const [openOrder, setOpenOrder] = useState(false);
    const { order, index} = props;
    const dispatch = useDispatch();

    function openOrderHandler(){
        setOpenOrder(prevState => !prevState);
    }
        
    function deleteOrderHandler(){
        const id = order.id;
        dispatch(orderActions.deleteOrder(id));
    }

    function increaseItemHandler(event){
        const payload = {
            item: event,
            order: order.id
        }
        dispatch(orderActions.increaseItem(payload));
    }
    function decreaseItemHandler(event){
        const payload = {
            item: event,
            order: order.id
        }
        dispatch(orderActions.decreaseItem(payload));
    }
    function deleteItem(event){
        const payload = {
            item: event.target.id,
            order: order.id
        }
        dispatch(orderActions.removeSingleItem(payload))
    }


return (
<div>
    <h1>{order.name}</h1>
    <Button.Group>
        <Button auto onPress={openOrderHandler}>Open Order</Button>
        <Button auto onPress={deleteOrderHandler} >Delete Order</Button>
    </Button.Group>
    {openOrder &&
    <div key={index}>
        <Card>
            <h4>Item Summary</h4>
            <p>Item details</p>

        <CustomTable
            key={index}
            tableColumns={[{title:"Name"},{title:"Dimentions (WxHxD)"},{title:"Weight"},{title: "Amount"},{title:"Actions"}]}
            packages={order.items} 
            orderTable
            itemsPerPage={order.items.length || 2}
            increaseItem={increaseItemHandler}
            decreaseItem={decreaseItemHandler}
            deleteItem={deleteItem}
            />
        </Card>
    </div>}
</div>
)}