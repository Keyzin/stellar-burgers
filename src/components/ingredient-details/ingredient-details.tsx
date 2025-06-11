import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { selectIngridients } from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(selectIngridients);
  const params = useParams<{ id: string }>();
  const ingredientData = ingredients.find((item) => item._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
