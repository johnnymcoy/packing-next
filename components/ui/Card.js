import classes from './Card.module.css';

function Card(props) {
    const { className ,children} = props;
    const cardClasses = className ? `${className} ${classes.card}` : `${classes.card}`;
  return <div className={cardClasses}>{children}</div>;
}

export default Card;
