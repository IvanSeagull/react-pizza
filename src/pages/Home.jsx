import React from 'react';

import { useSelector } from 'react-redux';
import { AppContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const { categoryId, sortId } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // pages
  const [currentPage, setCurrentPage] = React.useState({ selected: 0 });
  const [totalPages, setTotalPages] = React.useState(1);

  const { searchValue } = React.useContext(AppContext);

  const getPizzas = () => {
    setIsLoading(true);
    fetch('/api/pizzas.json')
      .then((res) => res.json())
      .then((data) => filterPizzas(data))
      .then((data) => {
        setTotalPages(Math.ceil(data.length / 4));
        setItems(data.slice(4 * currentPage.selected, 4 * (currentPage.selected + 1)));
      })
      .finally(() => setIsLoading(false));
  };

  // filter pizzas (cuz I dont have proper api for this, IM STORING PIZZAS ON JSON)
  const filterPizzas = (items) => {
    if (categoryId !== 0) {
      items = items.filter((pizza) => pizza.category === categoryId);
    }
    switch (sortId) {
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

    return items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLocaleLowerCase()));
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortId, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? new Array(4).fill(0).map((_, index) => <Skeleton key={index} />)
          : items?.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>

      <Pagination totalPages={totalPages} setValue={setCurrentPage} />
    </div>
  );
};

export default Home;
