import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Loader from 'components/Loader/Loader';
import { getAuth, User, updateProfile } from 'firebase/auth';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './Settings.module.scss';

const cx = classNames.bind(styles);

interface ProfileInfo {
  photo: unknown;
  name: string | null;
  email: string;
}

const Settings = () => {
  const { currentUser } = getAuth();
  const storage = getStorage();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    photo: '',
    name: '',
    email: '',
  });
  const { name, email } = profileInfo;

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

  const uploadProfileData = async (file: Blob, currentUser: User) => {
    const fileRef = ref(storage,`${currentUser.uid}/avatars`);
    setIsLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    getDownloadURL(fileRef).then((url) => {
      updateProfile(currentUser, { photoURL: url, displayName: name });
    })
      .catch((error) => new Error(error.message));
    setIsLoading(false);
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
    <div className={cx('user')}>
      {isLoading && <Loader />}
      {isEdit ? (
        <>
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
             <span>{currentUser?.displayName}</span>
             <span>{currentUser?.email}</span>
          </>
        )}
      {isEdit ? (
        <button onClick={isEditHandler}>
          save
        </button>
      ) : (
        <button onClick={isEditHandler}>
          edit
        </button>
      )}
    </div>
  );
};

export default Settings;
