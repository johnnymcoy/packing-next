import Login from '@components/auth/Login';
import classes from './MainNavigation.module.css';
import Link from "next/link"
import { Flex } from '@components/styles/flex';
function MainNavigation() {

  return (
<header className={classes.header}>
    <Link href='/'>
        <div className={classes.logo}>
            <img src="\static\images\PARCELPRO-Logo.png" />
        </div>
    </Link>
    {/* <div className={classes.logo}>Parcel Pro</div> */}
    <nav>
    <ul>
        <li>
            <Login />
        </li>
        {/* <li>
        <Flex
            css={{ py: '0', gap: '0rem', px: '0' }}
            justify={'center'}
            wrap={'wrap'}
            direction={'column'}
            align={'center'}
        >
             <Link href='/'>Parcel Pro</Link>
        </Flex>
        </li> */}
    </ul>
    </nav>
</header>
  );
}

export default MainNavigation;
