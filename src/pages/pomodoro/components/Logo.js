import { Link } from "react-router-dom";
import classes from "./Logo.module.css";

export default function Logo() {
  return (
    <h1 className={classes.text}>
      <Link to="/" className={classes.link}>
        Pomofocus
      </Link>
    </h1>
  );
}
