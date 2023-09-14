import classes from './MainNavigation.module.css';
import Link from "next/link"
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
          {/* <li>
            <Link href='/'>Parcel Pro</Link>
          </li> */}
          <li>
            <Link href='/'>Parcel Pro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
