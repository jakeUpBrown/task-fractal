import Icon from "../Icon";
import { Title, NoData } from "./common";
import classes from "./index.module.css";

const Card = ({ icon, label, value = "--" }) => (
  <div className={classes.card}>
    <div className={classes.cardIcon}>
      <Icon name={icon} size={32} />
    </div>
    <div className={classes.cardTitle}>{value}</div>
    <div className={classes.cardLabel}>{label}</div>
  </div>
);

const CardList = () => (
  <div>
    <NoData />
    <div className={classes.cards}>
      <Card label="hours focused" />
      <Card label="days accessed" />
      <Card label="day streak" />
    </div>
  </div>
);

export default function Summary() {
  return (
    <div>
      <section className={classes.activity}>
        <Title>Activity Summary</Title>
        <CardList />
      </section>
    </div>
  );
}
