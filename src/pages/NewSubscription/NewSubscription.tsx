import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import IconButton from 'components/IconButton/IconButton';
import SubscriptionCarousel from 'components/SubscriptionCarousel/SubscriptionCarousel';
import Input from 'components/Input/input';
import PriceHolder from 'components/PriceHolder/PriceHolder';
import Button from 'components/Button/Button';
import SubscriptionInfo from 'components/SubscriptionInfo/SubscriptionInfo';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFirestore }  from 'hooks/useGetDataFromFirestore';
import { createPortal } from 'react-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { Category, SubscriptionsInfo } from './type';
import styles from './NewSubscription.module.scss';
import { ReactComponent as Back } from 'assets/icons/backIcon.svg';

const cx = classNames.bind(styles);

const NewSubscription = () => {
  const navigate = useNavigate();
  const domNode = document.getElementById('root') as HTMLElement;
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const [isAdd, setIsAdd] = useState(false);
  const { availableSubsList, reminder, currency, categoryList, reminderList, currencyList } = subscriptionsInfo;
  const [userInfo, loading] = useGetDataFromFirestore();
  const [newSubsData, setNewSubsData] = useState({
    name: '',
    firstPayment: new Date().toISOString(),
    nextPayment: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
    description: '',
    price: 0,
    monthBillsSum: 0,
    category: '',
    reminder,
    currency,
  });
  const { name, firstPayment, description, price, category, } = newSubsData;

  useEffect(() => {
    if (userInfo) {
      setSubscriptionsInfo((prevState) => {
        return ({
          ...prevState,
          availableSubsList: userInfo[0].availableSubsList,
          reminder: userInfo[0].reminder,
          currency: userInfo[0].currency,
          categoryList: userInfo[0].categoryList.map((item: Category) => item.name),
          reminderList: userInfo[0].reminderList,
          currencyList: userInfo[0].currencyList,
        })
      });
    }
  }, [userInfo, loading]);

  const priceHandler = (value: number) => {
    return setNewSubsData((prevState) => (
      {
        ...prevState,
        price: value,
        monthBillsSum: prevState.monthBillsSum + value,
      })
    );
  };

  const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    return setNewSubsData((prevState) => ({...prevState, description: e.target.value}));
  };

  const carouselHandler = (value: string) => {
    return setNewSubsData((prevState) => ({...prevState, name: value}));
  };

  const onSubmitHandler = <T,>(data: T) => {
    if (userInfo) {
      const { currentUser } = getAuth();
      const cityRef = doc(db, `${currentUser?.uid}`, 'appsInfo');
      const newAvailableSubsList = availableSubsList.filter(({ name }) => name !== newSubsData.name);
      setDoc(
        cityRef,
        {
          availableSubsList: newAvailableSubsList,
          subsList: [...userInfo[0].subsList, {...newSubsData, ...data}]
        },
        { merge: true })
        .catch((error) => new Error(error.message));
    }
    navigate('/');
  };

  const onDeleteHandler = () => {
    setSubscriptionsInfo({} as SubscriptionsInfo);
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('container__btn')}>
        <IconButton onClick={() => navigate(-1)} Icon={Back} />
      </div>
      <span>new</span>
      <span className={cx('title')}>Add new <br />subscription</span>
        <div className={cx('carousel')}>
          <SubscriptionCarousel list={availableSubsList} onChange={carouselHandler} />
        </div>
       <div className={cx('footer')}>
         <Input
           onChange={descriptionHandler}
           value={newSubsData.description}
           isCentered
           label='Description'
         />
         <div className={cx('footer__price')}>
           <PriceHolder price={newSubsData.price} onChange={priceHandler} />
         </div>
         <Button onClick={() => setIsAdd(true)}>
         <span>
           Add this platform
         </span>
         </Button>
       </div>
       {isAdd ? createPortal(
         <div className={cx('portal')}>
           <SubscriptionInfo
             name={name}
             price={price}
             description={description}
             firstPayment={firstPayment}
             category={{
               current: category,
               categoryList,
             }}
             reminder={{
               current: reminder,
               reminderList,
             }}
             currency={{
               current: currency,
               currencyList,
             }}
             onSubmit={onSubmitHandler}
             onDelete={onDeleteHandler}
             onDownArrowClick={() => setIsAdd(false)}
           />
         </div>
        , domNode) : null}
     </div>
  );
};

export default NewSubscription;
