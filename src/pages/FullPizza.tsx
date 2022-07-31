import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../redux/cart/types';
import { addItem } from '../redux/cart/slice';
import { selectCartItemsById } from '../redux/cart/selectors';

import styles from '../scss/FullPizza.module.scss';

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  rating: number;
};

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemsById(Number(id)));

  const addedCount = cartItem ? cartItem.count : 0;

  const typeNames = ['Thin', 'Traditional'];

  React.useEffect(() => {
    getPizza();
  }, []);

  React.useEffect(() => {
    console.log(pizza);
  }, [pizza]);

  const onClickAdd = () => {
    if (!pizza) return;
    const item: CartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[0],
      size: pizza.sizes[0],
      count: 0,
    };

    dispatch(addItem(item));
  };

  const getPizza = async () => {
    try {
      if (id) {
        const { data } = await axios.get('/api/pizzas.json');
        let item = data.filter((obj: Pizza) => obj.id === +id)[0];
        item ? setPizza(item) : navigate('/');
      }
    } catch (error) {
      alert('Error');
      navigate('/');
    }
  };

  if (!pizza) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Home</span>
        </button>
      </Link>
      <div className={styles.container}>
        <img className={styles.img} src={pizza?.imageUrl} />
        <div className={styles.content}>
          <h2 className={styles.title}>{pizza?.title}</h2>
          <h4 className={styles.price}>{pizza?.price} $</h4>
          <button onClick={() => onClickAdd()} className="button button--outline button--add">
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
