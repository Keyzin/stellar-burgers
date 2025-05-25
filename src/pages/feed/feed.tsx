import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { fetchFeeds, selectOrders } from '../../slices/feedSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getOrderByNumberApi } from '@api';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeeds())]);
  }, [dispatch]);
  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
