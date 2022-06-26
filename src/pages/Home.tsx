import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizza } from '../redux/pizza/selectors';

import { setCurrentPage, setFilters } from '../redux/filter/slice';
import { FilterSliceState } from '../redux/filter/types';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

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
      sortId: sortId,
      currentPage: currentPage.selected,
    });
  };

  const getQueryString = () => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;
      console.log(params);
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
          items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setValue={(e: any) => dispatch(setCurrentPage(e))}
      />
    </div>
  );
};

export default Home;
