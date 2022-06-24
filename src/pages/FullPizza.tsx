import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<Pizza>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getPizza();
  }, []);

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
      <img src={pizza?.imageUrl} />
      <h2>{pizza?.title}</h2>
      <h4>{pizza?.price} ₽</h4>

      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
