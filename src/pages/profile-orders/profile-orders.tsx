import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrders,
  selectorUserOrder,
  userOrders
} from '../../slices/orderUserSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectorUserOrder);

  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(userOrders())]);
    return () => {
      dispatch(clearOrders());
    };
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
