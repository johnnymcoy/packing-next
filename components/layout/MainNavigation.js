import Login from '@components/auth/Login';
import classes from './MainNavigation.module.css';
import Link from "next/link"
import { Flex } from '@components/styles/flex';
import BurgerMenu from './BurgerMenu';
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from '@store/layout-context';


function MainNavigation() {
    const dispatch = useDispatch()
    const bMenuOpen = useSelector(state => state.layout.bBurgerOpen);
    function openMenuHandler(){
        dispatch(layoutActions.toggleBurgerMenu());
    }

  return (
<header className={classes.header}>
    <BurgerMenu onClick={openMenuHandler} menuOpen={bMenuOpen} />
    <Link href='/' className={classes.logo}>
        <div className={classes.logo}>
            <img src="\static\images\PARCELPRO-Logo.png" />
        </div>
    </Link>
    <nav>
        <Login />
    </nav>
</header>
  );
}

export default MainNavigation;
