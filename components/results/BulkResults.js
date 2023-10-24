import Card from "components/UI/Card"
import CSS from "./BulkResults.module.css"
import ResultBin from "./ResultBin"
import ResultsTable from "@components/UI/ResultsTable";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Modal } from "@components/modal/Modal";
 
export default function BulkResult(props){
    const {results : fullResults} = props;
    const [ showResultTable, setShowResultTable] = useState(false);
    const [ showResultDetails, setShowResultDetails] = useState(false);
    const [ singleResult, setSingleResult] = useState([]);

    function showResultHandler(){
        setShowResultTable(prevState => !prevState);
    }
    // Remove last item from the array {total details}
    const results = fullResults.slice(0, -1);

    function viewItemHandler(index){
        setShowResultDetails(true);
        setSingleResult(results[index]);
        // console.log(singleResult)
    }

    function closeResultDetails(){
        setShowResultDetails(false);
    }



    return (
<Card>
    {showResultDetails && <Modal title={"Result details"} onClose={closeResultDetails}>
        Boxes: {singleResult.map((item, index) =>
            <div key={index}>
                {item.bin.name}
            </div>

        )}
        
    </Modal>}
    <h4>Results</h4>
    <Button auto onPress={showResultHandler}>{showResultTable ? "Close" : "Open"} Results</Button>
    {showResultTable && <ResultsTable
        tableColumns={[{title:"Name", id: "name"},{title:"Boxes", id: "boxes"},{title:"Details"},{title:"Empty Volume", id: "emptyVolume"},{title:"Cubic Vol Weight", id: "cubicWeight"},{title:"Total Package Vol", id: "volume"},{title: "Cost Est. $", id: "cost"}]} 
        results={results}
        viewItem={viewItemHandler}
    />}
</Card>
)}

