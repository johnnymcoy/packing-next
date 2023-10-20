
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@components/icons/DeleteIcon";
import { IconButton } from "@components/icons/IconButton";
import { EditIcon } from "@components/icons/EditIcon";
import { useRef, useState } from "react";


export default function CustomTable(props){

    const { tableColumns, packages, deleteItem, orderTable, itemsPerPage, onSelectionChanged } = props;

    // const [selectedItems, setSelectedItems] = useState([]);
    const Columns = tableColumns.length;
    const bSix = Columns === 6;

    function onSelectionChangeHandler(event){
        if(onSelectionChanged)
        {
            onSelectionChanged(event);
        }
    }


    if(orderTable){
        return(
    <Table
    onSelectionChange={onSelectionChangeHandler}
    aria-label="Example table with static content"
    css={{
        height: "auto",
        minWidth: "100%",
        // paddingTop: "6rem",
    }}    
    striped
    animated={false}
    selectionMode="multiple"
>
    <Table.Header>
    {tableColumns && tableColumns.map((item, index) =>
        <Table.Column key={index}>{item.title}</Table.Column>   
    )}
    {/* <Table.Column>Delete</Table.Column> */}
    </Table.Header>
    <Table.Body>
    {packages && packages.map(item => 
        <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.width} x {item.height} x {item.depth}</Table.Cell>
            <Table.Cell>{item.weight}</Table.Cell>
            {/* <Table.Cell>{item.width * item.height * item.depth}</Table.Cell> */}
            <Table.Cell>{item.amount}</Table.Cell>


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
        </Table.Row>
        )}
    </Table.Body>
    <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={itemsPerPage ? (itemsPerPage < 20 ? itemsPerPage : 20) : 20}
        onPageChange={(page) => console.log({ page })}
      />
</Table>)
    }

    return(

<Table
    onSelectionChange={onSelectionChangeHandler}

    aria-label="Example table with static content"
    // lined
    // headerLined
    css={{
        height: "auto",
        minWidth: "100%",
        // paddingTop: "6rem",
    }}
    // compact
    // sticked
    // striped
    animated={false}
    selectionMode="multiple"
>
    <Table.Header>
    {tableColumns && tableColumns.map((item, index) =>
        <Table.Column key={index}>{item.title}</Table.Column>   
    )}
    {/* <Table.Column>Delete</Table.Column> */}
    </Table.Header>
    <Table.Body>
    {packages && packages.map((item, index) => 
        <Table.Row key={index}>
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
        </Table.Row>
        )}
    </Table.Body>
    <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={20}
        onPageChange={(page) => console.log({ page })}
      />
</Table>
    );
}