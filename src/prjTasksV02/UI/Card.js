

import classes from './Card.module.css';

const CardForm = props => {
  return <div className={classes.card}>
      {props.children}
      </div>;
};

export default CardForm;