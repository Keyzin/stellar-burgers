import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import {
  selectorConstructorItems,
  clearConstructor
} from '../../slices/constructorSlice';
import {
  clearOrder,
  selectorIsLoadingOrder,
  selectorOrder
} from '../../slices/orderSlice';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder } from '../../slices/orderSlice';
import { selectorIsAuthChecked, selectorUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectorConstructorItems);
  const orderModalData = useSelector(selectorOrder);
  const isLoading = useSelector(selectorIsLoadingOrder);
  const user = useSelector(selectorUser);
  const onOrderClick = () => {
    if (!user) {
      return navigate('/login', { replace: true });
    }
    if (!constructorItems.bun || isLoading) return;
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
