import SideButton from './SideButton';
import CSS from './Sidebar.module.css';

import { useDispatch, useSelector} from "react-redux";


export default function Sidebar(){

    const sidebarButtons = useSelector(state => state.layout);


    return(
<aside className={CSS.aside}>
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
