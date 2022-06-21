import React from 'react';

const Categories = ({ value, setValue }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories?.map((category, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => setValue(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
