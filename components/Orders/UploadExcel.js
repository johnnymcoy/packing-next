import { useRef, useState } from "react";
import axios, { spread } from 'axios';
import * as xlsx from 'xlsx';

function UploadExcel(){
    const [ spreadsheet, setSpreadsheet] = useState(null);
    const [ spreadsheetData, setSpreadsheetData] = useState("null");

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

            console.log(data)
        }
        else
        {
            console.log("Please Attach File");
        }
    };


    return(
<div>
    <h3>Upload Excel Sheet</h3>
    <form onSubmit={uploadFile}>
        <input type="file" accept="application/vnd.ms-excel,.xlsx,.xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={onFileChange} />
        <button type="submit">Upload</button>
    </form>
</div>
);}

export default UploadExcel;