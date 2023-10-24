
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip, useAsyncList, useCollator } from "@nextui-org/react";
import { DeleteIcon } from "@components/icons/DeleteIcon";
import { IconButton } from "@components/icons/IconButton";
import { EditIcon } from "@components/icons/EditIcon";
import { useRef, useState } from "react";
import { PlusIcon } from "@components/icons/PlusIcon";
import { MinusIcon } from "@components/icons/MinusIcon";
import { useSelector } from "react-redux";


export default function CustomTable(props){
    const decimalPlaces = useSelector(state => state.units.decimalPlaces);

    const { tableColumns, packages, deleteItem, orderTable, itemsPerPage, onSelectionChanged, increaseItem, decreaseItem } = props;

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    function onSelectionChangeHandler(event){
        if(onSelectionChanged)
        {
            onSelectionChanged(event);
        }
    }

    function sortList(event){
        let direction = 'ascending';
        let key = event.column.toLowerCase();
        if(key === "max weight")
        {
            key = "weight";
        }
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    const sortedData = [...packages].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    // function sort({ items, sortDescriptor }) {
    //     return {
    //         items: items.sort((a, b) => {
    //         let first = a[sortDescriptor.column];
    //         let second = b[sortDescriptor.column];
    //         let cmp = collator.compare(first, second);
    //         if (sortDescriptor.direction === "descending") {
    //           cmp *= -1;
    //         }
    //         console.log(cmp)

    //         return cmp;
    //       }),
    //     };
    // }

    // function load({ signal }) {
    //     // const res = await fetch("https://swapi.py4e.com/api/people/?search", {
    //     //   signal,
    //     // });
    //     // const json = await res.json();
    //     return {
    //       items: packages,
    //     };
    //   }
    
    
    // const list = useAsyncList({ load : packages, sort });
    // console.log(list)


    if(orderTable){
        return(
    <Table
        onSelectionChange={onSelectionChangeHandler}
        aria-label="Example table with static content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}    
        sticked
        animated={false}
        // selectionMode="multiple"
    >
    <Table.Header>
    {tableColumns && tableColumns.map((item, index) =>
        <Table.Column key={item.title} id={item.title}>{item.title}</Table.Column>   
    )}
    {/* <Table.Column>Delete</Table.Column> */}
    </Table.Header>
    <Table.Body>
    {sortedData && sortedData.map(item => 
        <Table.Row key={item.id} id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.width.toFixed(decimalPlaces)} x {item.height.toFixed(decimalPlaces)} x {item.depth.toFixed(decimalPlaces)}</Table.Cell>
            <Table.Cell>{item.weight.toFixed(decimalPlaces)}</Table.Cell>
            <Table.Cell>{item.amount}</Table.Cell>


            <Table.Cell>
                <Tooltip
                    content="Add Item"
                    color="warning"
                    onClick={() => increaseItem(item.id)}>
                    <IconButton>
                        <PlusIcon size={20} fill="#979797"/>
                    </IconButton>
                </Tooltip>
                <Tooltip
                    content="Remove Item"
                    color="warning"
                    onClick={() => decreaseItem(item.id)}>
                    <IconButton>
                        <MinusIcon size={20} fill="#979797"/>
                    </IconButton>
                </Tooltip>
                {/* <Tooltip
                    content="Edit item"
                    color="warning"
                    onClick={() => console.log("Edit item")}>
                    <IconButton>
                        <EditIcon size={20} fill="#979797"/>
                    </IconButton>
                </Tooltip> */}
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
    onSortChange={sortList}
    css={{
        height: "auto",
        minWidth: "100%",
    }}
    sticked
    animated={false}
    selectionMode="multiple"
>
    <Table.Header>
    {tableColumns && tableColumns.map((item, index) =>
        <Table.Column key={item.title} id={item.title} allowsSorting>{item.title}</Table.Column>   
    )}
    {/* <Table.Column>Delete</Table.Column> */}
    </Table.Header>
    <Table.Body items={packages} >
        {/* {(item) =>
            <Table.Row key={item.id}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>

        } */}
    {sortedData && sortedData.map((item, index) => 
        <Table.Row key={item.id} id={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.width.toFixed(decimalPlaces)} x {item.height.toFixed(decimalPlaces)} x {item.depth.toFixed(decimalPlaces)}</Table.Cell>
            <Table.Cell>{item.weight.toFixed(decimalPlaces)}</Table.Cell>
            <Table.Cell>{(item.width * item.height * item.depth).toFixed(decimalPlaces)}</Table.Cell>


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