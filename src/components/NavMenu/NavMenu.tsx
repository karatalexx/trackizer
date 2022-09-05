import React from 'react';
import classNames from 'classnames/bind';
import IconButton from '../IconButton/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavMenu.module.scss';
import { ReactComponent as NavLayout } from 'assets/icons/navbar.svg';
import { ReactComponent as Home } from 'assets/icons/home.svg';
import { ReactComponent as Budgets } from 'assets/icons/budgets.svg';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { ReactComponent as Cards } from 'assets/icons/cards.svg';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';

const cx = classNames.bind(styles);

const NavMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={cx('wrapper')}>
      <NavLayout />
      <div className={cx('icon__btns')}>
        <div className={cx('icon__btns_inner')}>
          <IconButton
            isActive={pathname === '/'}
            Icon={Home}
            onClick={() => navigate('/')}
            testId='main'
          />
          <IconButton
            isActive={pathname === '/budgets'}
            Icon={Budgets}
            onClick={() => navigate('/budgets')}
          />
        </div>
        <div className={cx('icon__btns_inner')}>
          <IconButton
            isActive={pathname === '/calendar'}
            Icon={Calendar}
            onClick={() => navigate('/calendar')}
          />
          <IconButton
            isActive={pathname === '/cards'}
            Icon={Cards}
            onClick={() => navigate('/cards')}
          />
        </div>
      </div>
      <button
        onClick={() => navigate('/new_subscription')}
        className={cx('add__btn')}>
        <Plus className={cx('add__btn_icon')} />
      </button>
      <div className={cx('blur')} data-blur='true' />
    </div>
    );
};

export default NavMenu;
