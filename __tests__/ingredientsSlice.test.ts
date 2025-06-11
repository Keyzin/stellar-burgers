import { expect, test, describe } from '@jest/globals';
import { TIngredient } from "../src/utils/types"
import ingredientsReducer, { initialState as ingredientsInitialState, fetchIngredients } from "../src/slices/ingredientsSlice"
describe('Проверка вызова экшена Request', () => {
    
    const ingredientsMock: TIngredient[] = [
  {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  },
  {
    "_id": "643d69a5c3f7b9001cfa0941",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  },
]

    test('вызов fetchIngredients.pending', ()=>{
        const newState = ingredientsReducer(ingredientsInitialState,{type:fetchIngredients.pending.type})

        expect(newState).toEqual({
            ...ingredientsInitialState,
            loading:true,
            error:null
        })
    })

      test('вызов fetchIngredients.fulfilled', ()=>{
        const newState = ingredientsReducer(ingredientsInitialState,{type:fetchIngredients.fulfilled.type, payload:ingredientsMock})

        expect(newState).toEqual({
            ...ingredientsInitialState,
            ingredients:ingredientsMock,
            loading:false,
            error:null
        })
    })

      test('вызов fetchIngredients.rejected', ()=>{
        const errorMessage = "Ошибка"
        const newState = ingredientsReducer(ingredientsInitialState,{type:fetchIngredients.rejected.type, error:{message: errorMessage}})

        expect(newState).toEqual({
            ...ingredientsInitialState,
            loading:false,
            error:errorMessage
        })
    })
})
