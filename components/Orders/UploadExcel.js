import { useRef, useState } from "react";
import * as xlsx from 'xlsx';
import Card from "components/UI/Card";
import Modal from "components/UI/Modal";
import AddOrderItem from "./AddOrderItem";

function UploadExcel(props){
    const {addOrder} = props
    const [ spreadsheet, setSpreadsheet] = useState(null);
    const [ spreadsheetData, setSpreadsheetData] = useState([]);
    const [ showAddOrder, setShowAddOrder] = useState(false);

    const fileTypes ="application/vnd.ms-excel,.xlsx,.xls";

    function onFileChange(event){
        let selectedFile = event.target.files[0];
        console.log(selectedFile)
        if(selectedFile)
        {
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (e)=> {
                setSpreadsheet(e.target.result);
                console.log(e.target.result)
            }
        }
    }
    const uploadFile = async (event) => {
        event.preventDefault();
        if(spreadsheet !== null)
        {
            console.log("Submit");
            const workbook = xlsx.read(spreadsheet, {type: "buffer"});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            setShowAddOrder(true);
            let convertedData = []
            for(let i = 0; i < data.length; i++)
            {
                //TODO pop up error if any items are missing
                const newPackage = {
                    name: data[i]['Product Name'],
                    id: data[i][`Product ID`],
                    width: data[i].Width ? data[i].Width : 0.1, 
                    depth: data[i].Length ? data[i].Length : 0.1, 
                    height: data[i].Height ? data[i].Height : 0.1, 
                    weight: data[i].weight ? data[i].weight : 0.1,
                    amount: 1 
                }
                convertedData.push(newPackage);
        
            }
            setSpreadsheetData(convertedData);
        }
        else
        {
            console.log("Please Attach File");
        }
    };

    function removeModal(){
        setShowAddOrder(false);
    }

    function addOrderItem(){
        if(spreadsheetData)
        {
            addOrder(spreadsheetData[0])
            setSpreadsheetData(prevState => prevState.filter(item => item !== prevState[0]))
            setShowAddOrder(true);
        }
    }


    return(
<Card>
    {showAddOrder && spreadsheetData[0] && 
    <Modal title="Loaded Package" onRemove={removeModal} backdrop>
        {"Items Remaining: "+ spreadsheetData.length}
        <AddOrderItem addOrder={addOrderItem} prefillData={spreadsheetData[0]} bDontReset/>
    </Modal>}

    <div>
        <h3>Upload Excel Sheet</h3>
        <form onSubmit={uploadFile}>
            <input type="file" accept="application/vnd.ms-excel,.xlsx,.xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={onFileChange} />
            <button type="submit">Upload</button>
        </form>
    </div>
</Card>
);}

export default UploadExcel;