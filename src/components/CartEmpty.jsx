import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => (
  <div className="cart cart--empty">
    <h2>
      Basket is empty <span>😕</span>
    </h2>
    <p>
      There is no pizzas in your basket
      <br />
      To add pizza go to main page
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Go back</span>
    </Link>
  </div>
);

export default CartEmpty;
