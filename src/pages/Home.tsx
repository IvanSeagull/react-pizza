import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizza } from '../redux/pizza/selectors';

import { setCurrentPage, setFilters } from '../redux/filter/slice';
import { FilterSliceState } from '../redux/filter/types';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import PizzasAmount from '../components/PizzasAmount';

const Home: React.FC = () => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy'];

  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, sortId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const [totalPages, setTotalPages] = React.useState(1);
  const [renderedPizzas, setRenderedPizzas] = React.useState('All');

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        categoryId,
        sortId,
        currentPage,
        searchValue,
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
    if (renderedPizzas !== 'All') {
      setTotalPages(Math.ceil(items.length / Number(renderedPizzas)));
    } else {
      setTotalPages(1);
    }
  }, [items, renderedPizzas]);

  React.useEffect(() => {
    dispatch(setCurrentPage({ selected: 0 }));
  }, [categoryId, sortId, searchValue, renderedPizzas]);

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
      <h2 className="content__title">{categories[categoryId]} pizzas</h2>
      <PizzasAmount value={renderedPizzas} setValue={setRenderedPizzas} />
      <div className="content__items">
        {status === 'error' ? (
          <div style={{ marginBottom: 50 }}>
            <h2>Error 😔</h2>
          </div>
        ) : status === 'loading' ? (
          new Array(4).fill(0).map((_, index) => <Skeleton key={index} />)
        ) : renderedPizzas !== 'All' ? (
          items
            ?.slice(
              Number(renderedPizzas) * currentPage.selected,
              Number(renderedPizzas) * (currentPage.selected + 1),
            )
            .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setValue={(e: any) => dispatch(setCurrentPage(e))}
        />
      )}
    </div>
  );
};

export default Home;
