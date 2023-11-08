import Link from 'next/link';
import { useRouter } from 'next/router';
import CSS from "./SubSideButton.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from '@store/layout-context';


function SubSideButton({link, title, disabled}){
    const router = useRouter();

    const dispatch = useDispatch()
    const bMenuOpen = useSelector(state => state.layout.bBurgerOpen);
    function openMenuHandler(){
        dispatch(layoutActions.toggleBurgerMenu());
    }

    if(!link){return(<div></div>);}

    const bIsHighlighter = router.asPath === link;

    const linksClasses = bIsHighlighter ? `${CSS.link} ${CSS.linkSelected}` : `${CSS.link}`;
    const containerClasses = bIsHighlighter ? `${CSS.container} ${CSS.containerSelected}` : `${CSS.container}`;
    function highlightHandler(){
        openMenuHandler();
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
            // onClick={highlightHandler} 
            >
            {title}
        </Link>}
        {disabled &&  
        <div className={CSS.disabled}>{title}(Disabled)</div>}
    </div>
</li>
);}

export default SubSideButton;