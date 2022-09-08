import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Field from '../../components/Field/Field';
import Loader from '../../components/Loader/Loader';
import IconButton from '../../components/IconButton/IconButton';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useNavigate} from 'react-router-dom';
import {useGetDataFromFirestore} from '../../hooks/useGetDataFromFirestore';
import styles from './Settings.module.scss';
import { ReactComponent as Arrow } from 'assets/icons/backIcon.svg';
import { ReactComponent as Security } from 'assets/icons/security-settings.svg';
import { ReactComponent as Cloud } from 'assets/icons/cloud.svg';
import { ReactComponent as AppIcon } from 'assets/icons/app-icon.svg';
import { ReactComponent as Currency } from 'assets/icons/currency.svg';
import { ReactComponent as Sorting } from 'assets/icons/sorting.svg';
import { ReactComponent as Summary } from 'assets/icons/summary.svg';
import { ReactComponent as Theme } from 'assets/icons/theme.svg';

const cx = classNames.bind(styles);

interface ProfileInfo {
  photo: unknown;
  name: string | null;
  email: string;
}

interface SubscriptionsInfo {
  currency: string;
  currencyList: string[];
  security: string;
  securityList: string[];
  sorting: string;
  sortingList: string[];
  theme: string;
  themeList: string[];
}

const Settings = () => {
  const { currentUser } = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const [userInfo, loading] = useGetDataFromFirestore();
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const [isEdit, setIsEdit] = useState(false);
  const [isClicked, setIsClicked] = useState('');
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    photo: '',
    name: '',
    email: '',
  });
  const { name, email, photo } = profileInfo;
  const {
    currency,
    currencyList,
    security,
    securityList,
    sorting,
    sortingList,
    theme,
    themeList
  } = subscriptionsInfo;

  const { handleSubmit, control } = useForm({
    defaultValues: {
      currency,
      security,
      sorting,
      theme,
      isCloudSync: false
    }
  });

  const arrowBtnHandler = (value: string) => setIsClicked(value);

  const onBlurHandler = () =>  setIsClicked('');

  const isEditHandler = () => setIsEdit((prevState) => !prevState);

  const photoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileInfo((prevState) => ({
        ...prevState,
        photo: e.target.files![0],
      }))
    }
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const uploadProfileData = async () => {
    if (currentUser) {
      const fileRef = ref(storage,`${currentUser?.uid}/avatars`);
      await uploadBytes(fileRef, photo as Blob);
      getDownloadURL(fileRef).then((url) => {
        updateProfile(currentUser, { photoURL: url, displayName: name });
        updateEmail(currentUser, email);
        isEditHandler();
      }).catch((error) => new Error(error.message));
    }
  };

  useEffect(() => {
    if (userInfo) {
      setSubscriptionsInfo({
        currency: userInfo[0].currency,
        currencyList: userInfo[0].currencyList,
        sorting: userInfo[0].sorting,
        sortingList: userInfo[0].sortingList,
        theme: userInfo[0].theme,
        themeList: userInfo[0].themeList,
        security: userInfo[0].security,
        securityList: userInfo[0].securityList,
      });
    }
  }, [userInfo, loading]);

  useEffect(() => {
    if (currentUser?.displayName || currentUser?.email || currentUser?.photoURL) {
      setProfileInfo({
        photo: currentUser?.photoURL,
        name: currentUser?.displayName,
        email: currentUser?.email || '',
      })
    }
  },[]);

  return (
    <>{loading ? (
      <Loader />
    ) : (
      <div className={cx('wrapper')}>
        <div className={cx('title')}>
          <IconButton onClick={() => navigate(-1)} Icon={Arrow} />
          <span>Settings</span>
        </div>
        <div className={cx('user')}>
          {isEdit ? (
            <>
              <img
                className={cx('user__avatar')}
                src={currentUser?.photoURL as string}
                alt='user-photo'
              />
              <input type='file' onChange={photoHandler}/>
              <input value={name as string} onChange={nameHandler} />
              <input value={email} onChange={emailHandler} />
            </>
          ) : (
            <>
              <img
                className={cx('user__avatar')}
                src={currentUser?.photoURL as string}
                alt='user-photo'
              />
              <span className={cx('user__name')}>{currentUser?.displayName}</span>
              <span className={cx('user__email')}>{currentUser?.email}</span>
            </>
          )}
          {isEdit ? (
            <button className={cx('user__btn')} onClick={uploadProfileData}>
              Save profile
            </button>
          ) : (
            <button className={cx('user__btn')} onClick={isEditHandler}>
              Edit profile
            </button>
          )}
        </div>
        <div className={cx('content')}>
          <div className={cx('content__group')}>
            <span className={cx('content__group_name')}>General</span>
            <div className={cx('content__group_field')}>
              <Controller
                control={control}
                name='security'
                render={({ field: { onChange, value } }) => (
                  <Field
                    Icon={Security}
                    onClick={arrowBtnHandler}
                    onChange={onChange}
                    onBlur={onBlurHandler}
                    isClicked={isClicked === 'Security'}
                    name='Security'
                    type='select'
                    value={value || security}
                    selectList={securityList}
                  />
                )}
              />
              <Controller
                control={control}
                name='isCloudSync'
                render={({ field: { onChange, value } }) => (
                  <Field
                    value=''
                    Icon={Cloud}
                    onChange={onChange}
                    isClicked={true}
                    name='iCloud Sync'
                    type='checkbox'
                    isChecked={value}
                  />
                )}
              />
            </div>
          </div>
          <div className={cx('content__group')}>
            <span className={cx('content__group_name')}>My subscriptions</span>
            <div className={cx('content__group_field')}>
              <Controller
                control={control}
                name='sorting'
                render={({ field: { onChange, value } }) => (
                  <Field
                    Icon={Sorting}
                    onClick={arrowBtnHandler}
                    onChange={onChange}
                    isClicked={isClicked === 'Sorting'}
                    name='Sorting'
                    type='select'
                    value={value || sorting}
                    selectList={sortingList}
                  />
                )}
              />
              <Field
                Icon={Summary}
                onChange={() => console.log('add summary')}
                isClicked={false}
                name='Summary'
                type='select'
                value='Average'
                selectList={[]}
              />
              <Controller
                control={control}
                name='currency'
                render={({ field: { onChange, value } }) => (
                  <Field
                    Icon={Currency}
                    onClick={arrowBtnHandler}
                    onChange={onChange}
                    isClicked={isClicked === 'Default currency'}
                    name='Default currency'
                    type='select'
                    value={value || currency}
                    selectList={currencyList}
                  />
                )}
              />
            </div>
          </div>
          <div className={cx('content__group')}>
            <span className={cx('content__group_name')}>Appearance</span>
            <div className={cx('content__group_field')}>
              <Field
                Icon={AppIcon}
                onClick={arrowBtnHandler}
                onChange={() => console.log('add App icon')}
                isClicked={false}
                name='App icon'
                type='select'
                value={'Default'}
                selectList={[]}
              />
              <Controller
                control={control}
                name='theme'
                render={({ field: { onChange, value } }) => (
                  <Field
                    Icon={Theme}
                    onClick={arrowBtnHandler}
                    onChange={onChange}
                    isClicked={isClicked === 'Theme'}
                    name='Theme'
                    type='select'
                    value={value || theme}
                    selectList={themeList}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    )}</>
  );
};

export default Settings;
