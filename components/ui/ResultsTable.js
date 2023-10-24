
import { Button, Container, Spacer, StyledButtonGroup, Table, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@components/icons/DeleteIcon";
import { IconButton } from "@components/icons/IconButton";
import { EditIcon } from "@components/icons/EditIcon";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { EyeIcon } from "@components/icons/EyeIcon";


export default function ResultsTable(props){
    const decimalPlaces = useSelector(state => state.units.decimalPlaces);

    const { tableColumns, results, viewItem, onSelectionChanged } = props;

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    function onSelectionChangeHandler(event){
        if(onSelectionChanged)
        {
            onSelectionChanged(event);
        }
    }

    function sortList(event){
        let direction = 'ascending';
        let key = event.column;
        console.log(key)
        if(key === "max weight")
        {
            key = "weight";
        }
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }


    const data = results.map((item, index) => {
        let boxes = 0;
        let emptyVolume = 0;
        let volume = 0;
        for(let i = 0; i < item.length; i++)
        {
            boxes++;
            emptyVolume += parseFloat(item[i].bin.emptyVolume);
            volume += parseFloat(item[i].bin.volume);
        }
        return{
            name: `${index + 1}`,//`${"Result"} ${index + 1}`,
            boxes: boxes,
            emptyVolume: emptyVolume,
            volume: volume,
            cubicWeight: ((volume / 1000000) * 250),
            cost: 10,
            index: index,
            bins: item,
        };
    })

    console.log(results, data)

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });


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
    onSortChange={sortList}
    // selectionMode="single"
>
    <Table.Header>
    {tableColumns && tableColumns.map((item, index) =>
        <Table.Column key={item.id ? item.id : item.title} allowsSorting>{item.title}</Table.Column>   
    )}
    </Table.Header>
    <Table.Body>
    {sortedData && sortedData.map((item, index) => 
        {
        return(
            <Table.Row key={index}>
                <Table.Cell>Result {item.name}</Table.Cell>
                <Table.Cell>{item.boxes}</Table.Cell>
                <Table.Cell>                
                    <IconButton onClick={(e) => {viewItem(item.index)}}>
                        <EyeIcon size={20} fill="#979797"/>
                    </IconButton>
                </Table.Cell>
                <Table.Cell>{item.emptyVolume.toFixed(decimalPlaces)}</Table.Cell>
                <Table.Cell>{item.cubicWeight.toFixed(decimalPlaces)}</Table.Cell>
                <Table.Cell>{item.volume.toFixed(decimalPlaces)}</Table.Cell>
                <Table.Cell>${item.cost.toFixed(decimalPlaces)}</Table.Cell>
            </Table.Row>
            )})
    }
    </Table.Body>
    <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={6}
        onPageChange={(page) => console.log({ page })}
      />
</Table>
    );
}