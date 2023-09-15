import Card from "components/UI/Card"
import CSS from "./Result.module.css"
import ResultBin from "./ResultBin"
 
export default function Result(props){
    const {result} = props




    return (
<Card>
    <div className={CSS.option}>
        {result && result.map(item =>
           <ResultBin data={item} />      
        )}
    </div>
</Card>
)}

