import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCategory } from '../redux/filter/selectors';
import { setCategoryId } from '../redux/filter/slice';

export const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectCategory);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories?.map((category, index) => (
          <li
            key={index}
            className={categoryId === index ? 'active' : ''}
            onClick={() => dispatch(setCategoryId(index))}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});
