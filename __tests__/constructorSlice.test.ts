import { expect, test, describe } from '@jest/globals';
import constructorReducer, { initialState as constructorInitialState, addIngredient, removeIngredient, moveIngredient, clearConstructor } from "../src/slices/constructorSlice"
import { TIngredient } from '../src/utils/types';
const bunMock: TIngredient = {

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
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png"
}

const ingredientMock1: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0944",
    "name": "Соус традиционный галактический",
    "type": "sauce",
    "proteins": 42,
    "fat": 24,
    "carbohydrates": 42,
    "calories": 99,
    "price": 15,
    "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
}

const ingredientMock2: TIngredient = {
    "_id": "643d69a5c3f7b9001cfa0944",
    "name": "Соус традиционный галактический",
    "type": "sauce",
    "proteins": 42,
    "fat": 24,
    "carbohydrates": 42,
    "calories": 99,
    "price": 15,
    "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
}


describe('тесты синхронных экшенов', () => {


    describe('проверка добавления', () => {

        test('проверка добавления булки', () => {
            const newState = constructorReducer(constructorInitialState, addIngredient(bunMock))
            expect(newState.constructorItems.bun).toEqual(bunMock);
            expect(newState.constructorItems.ingredients).toHaveLength(0);

        })

        test('проверка добавления ингредиента', () => {
            const newState = constructorReducer(constructorInitialState, addIngredient(ingredientMock1))
            expect(newState.constructorItems.bun).toBeNull();
            expect(newState.constructorItems.ingredients).toHaveLength(1);
            expect(newState.constructorItems.ingredients[0]).toMatchObject(ingredientMock1);
            expect(newState.constructorItems.ingredients[0].id).toBeDefined();
        })
    })

    describe('проверка удаления', () => {

        const initialState = {
            constructorItems: {
                bun: null,
                ingredients: [
                    { ...ingredientMock1, _id:'1', id: '1' },
                    { ...ingredientMock2, _id:'2', id: '2' },
                ]
            },
            orderModalData: null
        }

        test('Удаление ингредиента из конструктора', () => {
            const newState = constructorReducer(initialState, removeIngredient('1'))
            expect(newState.constructorItems.ingredients).toHaveLength(1);
            expect(newState.constructorItems.ingredients[0]._id).toBe('2');
        })
    })

    describe('Изменение порядка ингредиента в начинке', ()=>{

        const initialState = {
            constructorItems: {
                bun: null,
                ingredients: [
                    { ...ingredientMock1, _id:'1', id: '1' },
                    { ...ingredientMock2, _id:'2', id: '2' },
                    { ...ingredientMock2, _id:'3', id: '3' },
                ]
            },
            orderModalData: null
        }

        test('передвинуть ингредиент вниз',()=>{
            const newState = constructorReducer(initialState, moveIngredient({fromIndex:0, toIndex:2}))
            expect(newState.constructorItems.ingredients.map(i=>i._id)).toEqual([
                '2',
                '3',
                '1'
            ])
        })

         test('передвинуть ингредиент вверх',()=>{
            const newState = constructorReducer(initialState, moveIngredient({fromIndex:1, toIndex:0}))
            expect(newState.constructorItems.ingredients.map(i=>i._id)).toEqual([
                '2',
                '1',
                '3'
            ])
        })
    })

    describe('очистка конструктора', ()=>{

        const initialState = {
            constructorItems: {
                bun: null,
                ingredients: [
                    { ...ingredientMock1, _id:'1', id: '1' },
                    { ...ingredientMock2, _id:'2', id: '2' },
                ]
            },
            orderModalData: null
        }

        test('очистить коструктор', ()=>{
            const newState = constructorReducer(initialState, clearConstructor())

            expect(newState.constructorItems.bun).toBeNull();
            expect(newState.constructorItems.ingredients).toHaveLength(0);
        })
    })

})


