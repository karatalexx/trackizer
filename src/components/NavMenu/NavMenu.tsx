import React from 'react';
import classNames from 'classnames/bind';
import IconButton from '../IconButton/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRIVATE_PATHS } from 'constants/paths/privatePaths';
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
  const { HOME, BUDGETS, CALENDAR, CARDS, NEW_SUBSCRIPTION } = PRIVATE_PATHS;

  return (
    <div className={cx('wrapper')}>
      <NavLayout />
      <div className={cx('icon__btns')}>
        <div className={cx('icon__btns_inner')}>
          <IconButton
            isActive={pathname === HOME}
            Icon={Home}
            onClick={() => navigate(HOME)}
            testId='main'
          />
          <IconButton
            isActive={pathname === BUDGETS}
            Icon={Budgets}
            onClick={() => navigate(BUDGETS)}
          />
        </div>
        <div className={cx('icon__btns_inner')}>
          <IconButton
            isActive={pathname === CALENDAR}
            Icon={Calendar}
            onClick={() => navigate(CALENDAR)}
          />
          <IconButton
            isActive={pathname === CARDS}
            Icon={Cards}
            onClick={() => navigate(CARDS)}
          />
        </div>
      </div>
      <button
        onClick={() => navigate(NEW_SUBSCRIPTION)}
        className={cx('add__btn')}>
        <Plus className={cx('add__btn_icon')} />
      </button>
      <div className={cx('blur')} data-blur='true' />
    </div>
  );
};

export default NavMenu;
