import CustomTable from "@components/UI/CustomTable";
import { Button, Card } from "@nextui-org/react";
import { useState } from "react";





export default function BulkOrderItem(props){
    const [openOrder, setOpenOrder] = useState(false);
    const { order, index} = props;
    
    function openOrderHandler(){
        setOpenOrder(prevState => !prevState);
    }

return (
<div>
    <h1>{order.name}</h1>
    <Button auto onPress={openOrderHandler}>Open Order</Button>
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
            itemsPerPage={order.items.length}
            />
        </Card>
    </div>}
</div>
)}