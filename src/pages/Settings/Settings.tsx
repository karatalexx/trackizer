import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Loader from 'components/Loader/Loader';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './Settings.module.scss';
import { ReactComponent as Arrow} from 'assets/icons/backIcon.svg';
import { ReactComponent as Security} from 'assets/icons/security-settings.svg';
import { ReactComponent as Cloud} from 'assets/icons/cloud.svg';
import IconButton from '../../components/IconButton/IconButton';
import {useNavigate} from 'react-router-dom';
import Field from '../../components/Field/Field';

const cx = classNames.bind(styles);

interface ProfileInfo {
  photo: unknown;
  name: string | null;
  email: string;
}

const Settings = () => {
  const { currentUser } = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    photo: '',
    name: '',
    email: '',
  });
  const { name, email, photo } = profileInfo;

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
      setIsLoading(true);
      await uploadBytes(fileRef, photo as Blob);
      getDownloadURL(fileRef).then((url) => {
        updateProfile(currentUser, { photoURL: url, displayName: name });
        updateEmail(currentUser, email);
        isEditHandler();
      })
        .catch((error) => new Error(error.message));
      setIsLoading(false);
    }
  };

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
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <IconButton onClick={() => navigate(-1)} Icon={Arrow} />
        <span>Settings</span>
      </div>
      <div className={cx('user')}>
        {isLoading && <Loader />}
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
            <Field
              Icon={Security}
              onClick={() => console.log('1')}
              onChange={() => console.log('2')}
              isClicked={false}
              name='Security'
              type='select'
              value={'2'}
              selectList={[]}
            />
            <Field
              Icon={Cloud}
              onClick={() => console.log('1')}
              onChange={() => console.log('2')}
              isClicked={false}
              name='iCloud Sync'
              type='checkbox'
              value={'2'}
              selectList={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
