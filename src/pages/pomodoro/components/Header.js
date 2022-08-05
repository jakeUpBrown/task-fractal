import { useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icon";
import classes from "./Header.module.css";
import Menu, { MenuItem } from "./Menu";

function Button({ icon, children, onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.label}>{children}</span>
    </button>
  );
}

export default function Header() {

  return (
    <header className={classes.container}>
      <div className={classes.content}>
        <ul className={classes.nav}>
          <li>
            <Link to="/report">
              <Button>Report</Button>
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <Button>Setting</Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
