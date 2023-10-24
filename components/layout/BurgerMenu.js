import CSS from "./BurgerMenu.module.css";

export default function BurgerMenu({menuOpen, onClick}){
    const bMenuOpen = menuOpen;
    const svgRec1 = bMenuOpen ? `${CSS.rectangle1Close} ` : `${CSS.rectangle1} ` ;
    const svgRec2 = bMenuOpen ? `${CSS.rectangle2Close} ` : `${CSS.rectangle2} ` ;
    const svgRec3 = bMenuOpen ? `${CSS.rectangle3Close} ` : `${CSS.rectangle3} ` ;

    return(    
<button className={CSS.menuBurger} onClick={onClick}>
    <svg viewBox="0 0 100 80" width="40" height="40">
        <rect className={svgRec1} width="100" height="10"></rect>
        <rect className={svgRec2} y="35" width="100" height="10"></rect>
        <rect className={svgRec3} y="70" width="100" height="10"></rect>
    </svg>
</button>
);}
