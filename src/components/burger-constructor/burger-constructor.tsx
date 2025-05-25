import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectorConstructorItems,
  constructorOrderRequest,
  clearConstructor
} from '../../slices/constructorSlice';
import { clearOrder, selectorOrder } from '../../slices/orderSlice';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder } from '../../slices/orderSlice';
import { selectorIsAuthChecked, selectorUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectorConstructorItems);
  const orderRequest = useSelector(constructorOrderRequest);
  const orderModalData = useSelector(selectorOrder);
  const isAuthChecked = useSelector(selectorIsAuthChecked);
  const user = useSelector(selectorUser);
  const onOrderClick = () => {
    if (!user) {
      return navigate('/login', { replace: true });
    }

    if (!constructorItems.bun || orderRequest) return;
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
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
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
