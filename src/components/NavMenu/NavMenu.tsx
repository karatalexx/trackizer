import React from 'react';
import classNames from 'classnames/bind';
import IconButton from '../IconButton/IconButton';
import styles from './NavMenu.module.scss';
import { ReactComponent as NavLayout } from '../../assets/icons/navbar.svg';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Budgets } from '../../assets/icons/budgets.svg';
import { ReactComponent as Calendar } from '../../assets/icons/calendar.svg';
import { ReactComponent as Cards } from '../../assets/icons/cards.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

const cx = classNames.bind(styles);

const NavMenu = () => {
  // the active icon will depend on the path, that functionality will be added after adding routing
  const navigate = (path: string) => console.log(path);

  return (
    <div className={cx('wrapper')}>
      <NavLayout />
      <div className={cx('icon__btns')}>
        <div className={cx('icon__btns_inner')}>
          <IconButton
            Icon={Home}
            onClick={() => navigate('/')}
            testId='main'
          />
          <IconButton Icon={Budgets} onClick={() => navigate('/budgets')} />
        </div>
        <div className={cx('icon__btns_inner')}>
          <IconButton Icon={Calendar} onClick={() => navigate('/calendar')} />
          <IconButton Icon={Cards} onClick={() => navigate('/cards')} />
        </div>
      </div>
      <button onClick={() => navigate('')} className={cx('add__btn')}>
        <Plus className={cx('add__btn_icon')} />
      </button>
      <div className={cx('blur')}/>
    </div>
    );
};

export default NavMenu;
