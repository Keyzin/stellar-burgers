import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={
              location.pathname === '/' ? styles.link_active : styles.link
            }
          >
            <div className={`${styles.item}`}>
              <BurgerIcon
                type={location.pathname === '/' ? 'primary' : 'secondary'}
              />
              <span className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </span>
            </div>
          </NavLink>
          <NavLink
            to='/feed'
            className={
              location.pathname.includes('feed')
                ? styles.link_active
                : styles.link
            }
          >
            <div className={`${styles.item}`}>
              <ListIcon
                type={location.pathname === '/feed' ? 'primary' : 'secondary'}
              />
              <span className='text text_type_main-default ml-2'>
                Лента заказов
              </span>
            </div>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={
              location.pathname.includes('profile')
                ? styles.link_active
                : styles.link
            }
          >
            <div className={`${styles.item}`}>
              <ProfileIcon
                type={
                  location.pathname === '/profile' ? 'primary' : 'secondary'
                }
              />
              <span className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </span>
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
