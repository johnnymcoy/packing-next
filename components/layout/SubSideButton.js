import Link from 'next/link';
import { useRouter } from 'next/router';
import CSS from "./SubSideButton.module.css";
import { useState } from 'react';



function SubSideButton({link, title}){
    const router = useRouter();
    // const [ selected, setSelected] = useState(false);

    if(!link)
    {
        return(<div></div>)
    }
    const bIsHighlighter = router.asPath === link;

    const linksClasses = bIsHighlighter ? `${CSS.link} ${CSS.linkSelected}` : `${CSS.link}`;
    const containerClasses = bIsHighlighter ? `${CSS.container} ${CSS.containerSelected}` : `${CSS.container}`;
    // const linksClasses = selected ? `${CSS.link} ${CSS.linkSelected}` : `${CSS.link}`;
    // if(bIsHighlighter)
    // {
    //     console.log(props.title)
    // }

    // if(selected)
    // {
    //     console.log(props.title)
    // }
    function highlightHandler(){
        // setSelected(prevState => !prevState);
        // console.log(selected)
    }

   return(

<li className={containerClasses} 
    key={title}
    onClick={highlightHandler}
    >
    <div className={linksClasses}>
        <Link 
            className={linksClasses} 
            href={link} 
            onClick={highlightHandler} 
            >
            {title}
        </Link>

    </div>
</li>

);}

export default SubSideButton;