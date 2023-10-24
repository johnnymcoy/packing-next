import Link from 'next/link';
import { useRouter } from 'next/router';
import CSS from "./SubSideButton.module.css";
import { useState } from 'react';



function SubSideButton({link, title, disabled}){
    const router = useRouter();

    if(!link)
    {
        return(<div></div>)
    }
    const bIsHighlighter = router.asPath === link;

    const linksClasses = bIsHighlighter ? `${CSS.link} ${CSS.linkSelected}` : `${CSS.link}`;
    const containerClasses = bIsHighlighter ? `${CSS.container} ${CSS.containerSelected}` : `${CSS.container}`;
    function highlightHandler(){
        // setSelected(prevState => !prevState);
    }

   return(

<li className={containerClasses} 
    key={title}
    onClick={highlightHandler}
    >
    <div className={linksClasses}>
        {!disabled && <Link 
            className={linksClasses} 
            href={link} 
            onClick={highlightHandler} 
            >
            {title}
        </Link>}
        {disabled &&  
        <div className={CSS.disabled}>{title} (Disabled)</div>}
    </div>
</li>

);}

export default SubSideButton;