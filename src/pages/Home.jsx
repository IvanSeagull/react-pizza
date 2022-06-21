import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // categories
  const [activeIndex, setActiveIndex] = React.useState(0);
  // sort
  const [selectedOption, setSelectedOption] = React.useState(0);

  const getPizzas = () => {
    setIsLoading(true);
    fetch('/api/pizzas.json')
      .then((res) => res.json())
      .then((data) => filterPizzas(data))
      .then((data) => setItems(data))
      .finally(() => setIsLoading(false));
  };

  // filter pizzas (cuz I dont have proper api for this, IM STORING PIZZAS ON JSON)
  const filterPizzas = (items) => {
    if (activeIndex !== 0) {
      items = items.filter((pizza) => pizza.category === activeIndex);
    }
    switch (selectedOption) {
      case 1:
        items = items.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case 2:
        items = items.sort((a, b) => a.price - b.price);
        break;
      case 3:
        items = items.sort((a, b) => b.price - a.price);
        break;
      case 4:
        items = items.sort((a, b) => b.rating - a.rating);
        break;
      case 5:
        items = items.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return items;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [activeIndex, selectedOption]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeIndex} setValue={(index) => setActiveIndex(index)} />
        <Sort value={selectedOption} setValue={(index) => setSelectedOption(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? new Array(10).fill(0).map((_, index) => <Skeleton key={index} />)
          : items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;