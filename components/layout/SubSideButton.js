import Link from 'next/link';
import { useRouter } from 'next/router';
import CSS from "./SubSideButton.module.css";
import { useState } from 'react';



function SubSideButton(props){
    const router = useRouter();
    const [ selected, setSelected] = useState(false);

    const bIsHighlighter = router.asPath === props.link;

    const linksClasses = bIsHighlighter ? `${CSS.link} ${CSS.linkSelected}` : `${CSS.link}`;
    const containerClasses = bIsHighlighter ? `${CSS.container} ${CSS.containerSelected}` : `${CSS.container}`;

    function highlightHandler(){
        setSelected(prevState => !prevState);
        // console.log(selected)
    }

   return(

<li className={containerClasses} 
    key={props.title}
    onClick={highlightHandler}
    >
    <div className={linksClasses}>
        <Link 
            className={linksClasses} 
            href={props.link} 
            onClick={highlightHandler} 
            >
            {props.title}
        </Link>

    </div>
</li>

);}

export default SubSideButton;