import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilter, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { categoryId, sortId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const [totalPages, setTotalPages] = React.useState(1);

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        categoryId,
        sortId,
        currentPage,
        searchValue,
        setTotalPages,
      }),
    );
  };

  React.useEffect(() => {
    getQueryString();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    navigation(`?${setQueryString()}`);
  }, [categoryId, sortId, currentPage, searchValue]);

  React.useEffect(() => {
    dispatch(setCurrentPage({ selected: 0 }));
  }, [categoryId, sortId, searchValue]);

  const setQueryString = () => {
    return qs.stringify({
      categoryId,
      sortProperty: sortId,
      currentPage: currentPage.selected,
    });
  };

  const getQueryString = () => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div style={{ marginBottom: 50 }}>
            <h2>Error 😔</h2>
          </div>
        ) : status === 'loading' ? (
          new Array(4).fill(0).map((_, index) => <Skeleton key={index} />)
        ) : (
          items?.map((obj) => (
            <Link to={`/pizza/${obj.id}`} key={obj.id}>
              <PizzaBlock {...obj} />
            </Link>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setValue={(e) => dispatch(setCurrentPage(e))}
      />
    </div>
  );
};

export default Home;
