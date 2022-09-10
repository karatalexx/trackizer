import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useForm, Controller } from 'react-hook-form';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Field from '../Field/Field';
import { getSubscriptionIcon } from 'utils/getSubscriptionIcon';
import { SubscriptionInfoProps } from './type';
import styles from './SubscriptionInfo.module.scss';
import { ReactComponent as DownMenu } from 'assets/icons/downMenuArrow.svg';
import { ReactComponent as TrashIcon } from 'assets/icons/trash.svg';

const cx = classNames.bind(styles);

const SubscriptionInfo = ({
  name,
  currency,
  category,
  firstPayment,
  reminder,
  description,
  price,
  onSubmit,
  onDelete,
  onDownArrowClick,
}: SubscriptionInfoProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name,
      price,
      description,
      category: category.current,
      firstPayment,
      reminder: reminder.current,
      currency: currency.current,
    }
  });

  const SubsIcon = getSubscriptionIcon(name);
  const [clickedField, setClickedField] = useState('');

  const arrowBtnHandler = (value: string) => setClickedField(value);

  const onSaveHandler = () => setClickedField('');

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('header__title')}>
          <IconButton onClick={onDownArrowClick} Icon={DownMenu} />
          <span className={cx('header__title_text')}>Subscription info</span>
          <IconButton onClick={onDelete} Icon={TrashIcon} />
        </div>
        <div className={cx('header__icon')}>
          <SubsIcon />
        </div>
        <span className={cx('header__name')}>{name}</span>
        <span className={cx('header__price')}>${price}</span>
      </div>
       <form
         onSubmit={handleSubmit(onSubmit)}
         className={cx('footer')}
         data-testid='form'>
        <div className={cx('footer__content')}>
           <Controller
             control={control}
             name='name'
             render={({ field: { onChange, value } }) => (
               <Field
                 name='Name'
                 value={value}
                 type='text'
                 onChange={onChange}
                 isClicked={clickedField === 'Name'}
                 onClick={arrowBtnHandler}
             />
             )}
           />
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, value } }) => (
              <Field
                name='Description'
                value={value}
                type='text'
                onChange={onChange}
                isClicked={clickedField === 'Description'}
                onClick={arrowBtnHandler}
              />
            )}
          />
          <Controller
            control={control}
            name='category'
            render={({ field: { onChange, value } }) => (
              <Field
                name='Category'
                value={value}
                type='select'
                selectList={category.categoryList}
                onChange={onChange}
                isClicked={clickedField === 'Category'}
                onClick={arrowBtnHandler}
              />
            )}
          />
          <Controller
            control={control}
            name='firstPayment'
            render={({ field: { onChange, value } }) => (
              <Field
                name='First payment'
                value={new Date(value).toLocaleDateString()}
                type='date'
                onChange={onChange}
                isClicked={clickedField === 'First payment'}
                onClick={arrowBtnHandler}
              />
            )}
          />
          <Controller
            control={control}
            name='reminder'
            render={({ field: { onChange, value } }) => (
              <Field
                name='Reminder'
                value={value}
                type='select'
                selectList={reminder.reminderList}
                onChange={onChange}
                isClicked={clickedField === 'Reminder'}
                onClick={arrowBtnHandler}
              />
            )}
          />
          <Controller
            control={control}
            name='currency'
            render={({ field: { onChange, value} }) => (
              <Field
                name='Currency'
                value={value}
                type='select'
                selectList={currency.currencyList}
                onChange={onChange}
                isClicked={clickedField === 'Currency'}
                onClick={arrowBtnHandler}
              />
            )}
          />
        </div>
         <Button
           onClick={onSaveHandler}
           variant='darkGray'
           type='submit'
           data-testid='submit'>
             <span>Save</span>
         </Button>
       </form>
    </div>
  );
};

export default SubscriptionInfo;
