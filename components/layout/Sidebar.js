import { Button } from '@nextui-org/react';
import SideButton from './SideButton';
import CSS from './Sidebar.module.css';

import { useDispatch, useSelector} from "react-redux";


export default function Sidebar(){
    const bMenuOpen = useSelector(state => state.layout.bBurgerOpen);

    const sidebarButtons = useSelector(state => state.layout.items);

    const asideClasses = bMenuOpen ? `${CSS.aside} ${CSS.mobile}`: `${CSS.aside}`;


    return(
<aside className={asideClasses}>
    <div className={CSS.sidebar}>
        <div className={CSS.sidebarItems}>
            <ul className={CSS.sidebarList}>
                {sidebarButtons && sidebarButtons.map(item =>
                    <SideButton title={item.title} buttons={item.buttons} key={item.title}/>
                )}
            </ul>
        </div>
    </div>
</aside>
);}
