import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCart.module.css";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [buttonHighlighted, setButtonHighlited] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonHighlited(true);

    const timer = setTimeout(() => {
      setButtonHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItem = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const classButton = `${classes.button} ${
    buttonHighlighted ? classes.bump : ""
  }`;

  return (
    <button className={classButton} onClick={props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
