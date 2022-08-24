import React, {ChangeEvent, useEffect, useState} from 'react';
import Input from '../Input/input';
import classNames from 'classnames/bind';
import { ReactComponent as Plus } from 'assets/icons/plusInput.svg';
import { ReactComponent as Minus } from 'assets/icons/minus.svg';
import styles from './PriceHolder.module.scss';

const cx = classNames.bind(styles);

export interface PriceHolderProps {
  price: number;
  onChange: (value: number) => void;
}

const PriceHolder = ({ price, onChange }: PriceHolderProps) => {
  const [priceValue, setPriceValue] = useState(price);

  const priceValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace('$', '');
    const numberValue = value.replace(/\D/g,'');
    const modifiedValue = +numberValue.replace(/\B(?=(?!\d{3})+(?!\d{}))/, '.');

    setPriceValue(modifiedValue);
  };

  const incrementValue = () => setPriceValue((prevState) => +(prevState + 0.01).toFixed(2));
  
  const decrementValue = () => setPriceValue((prevState) => +(prevState - 0.01).toFixed(2));

  useEffect(() => {
    onChange(priceValue);
  }, [priceValue]);

  return (
    <div className={cx('wrapper')}>
      <button
        className={cx('wrapper__btn')}
        onClick={decrementValue}
        data-testid='minus'>
          <Minus />
      </button>
      <div className={cx('wrapper__price')}>
        <Input
          onChange={priceValueHandler}
          label='Mothly price'
          value={`$${priceValue}`}
          isCentered
          className='price' />
      </div>
      <button
        className={cx('wrapper__btn')}
        onClick={incrementValue}
        data-testid='plus'>
          <Plus />
      </button>
    </div>
  );
};

export default PriceHolder;
