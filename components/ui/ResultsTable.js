
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@components/icons/DeleteIcon";
import { IconButton } from "@components/icons/IconButton";
import { EditIcon } from "@components/icons/EditIcon";
import { useRef, useState } from "react";


export default function ResultsTable(props){

    const { tableColumns, results, deleteItem, orderTable, itemsPerPage, onSelectionChanged } = props;

    // console.log("Table Results", results)

    // const {bin, items} = results
    // const [selectedItems, setSelectedItems] = useState([]);
    const Columns = tableColumns.length;
    const bSix = Columns === 6;

    function onSelectionChangeHandler(event){
        if(onSelectionChanged)
        {
            onSelectionChanged(event);
        }
    }
    return(

<Table
    onSelectionChange={onSelectionChangeHandler}

    aria-label="Example table with static content"
    lined
    headerLined
    css={{
        height: "auto",
        minWidth: "100%",
        // paddingTop: "6rem",
    }}
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
    {results && results.map((item, index) => 
        <Table.Row key={index}>
            <Table.Cell>{console.log("Table Results", item)}{item.bin.name}</Table.Cell>
            <Table.Cell>{item.bin.totalWeight}</Table.Cell>
            <Table.Cell>{item.bin.emptyVolume}</Table.Cell>
            <Table.Cell>{(item.bin.volume / 1000000) * 250}</Table.Cell>
            <Table.Cell>{item.bin.volume}</Table.Cell>

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