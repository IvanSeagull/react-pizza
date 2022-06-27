import clsx from 'clsx';
import React from 'react';

import styles from './PizzasAmount.module.scss';

type PopupClick = MouseEvent & {
  path: Node[];
};

type PizzaAmountProps = {
  value: string;
  setValue: any;
};

const PizzasAmount: React.FC<PizzaAmountProps> = ({ value, setValue }) => {
  const showOptions = ['All', '4', '8', '16', '20'];
  const [isPopup, setIsPopup] = React.useState<boolean>(false);
  const amountRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as PopupClick;
      if (amountRef.current && !_event.path.includes(amountRef.current)) {
        setIsPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={amountRef} className={styles.root}>
      <div className="sort__label">
        <svg
          className={clsx({ active: isPopup })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Show:</b>
        <span onClick={() => setIsPopup((prev) => !prev)}>{value}</span>
      </div>
      {isPopup && (
        <div className={styles.popup}>
          <ul>
            {showOptions?.map((option, index) => (
              <li
                className={value === showOptions[index] ? styles.active : ''}
                onClick={() => {
                  setValue(option);
                  setIsPopup(false);
                }}
                key={index}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PizzasAmount;
