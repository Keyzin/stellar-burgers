import { expect, test, describe } from '@jest/globals';
import { TOrder } from "../src/utils/types"
import orderReducer, { initialState as orderInitialState, createOrder } from "../src/slices/orderSlice"
describe('Проверка вызова экшена Request', () => {

    const orderMock: TOrder = {
        "_id": "68486c24c2f30c001cb2b6f4",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        "name": "Флюоресцентный люминесцентный бургер",
        "createdAt": "2025-06-10T17:32:20.965Z",
        "updatedAt": "2025-06-10T17:32:21.821Z",
        "number": 80902
    }

    test('вызов createOrder.pending', () => {
        const newState = orderReducer(orderInitialState, { type: createOrder.pending.type })

        expect(newState).toEqual({
            ...orderInitialState,
            orderRequest:true,
            isLoading: true,
        })
    })

    test('вызов createOrder.fulfilled', () => {
        const newState = orderReducer(orderInitialState, { type: createOrder.fulfilled.type, payload: orderMock })

        expect(newState).toEqual({
            ...orderInitialState,
            orderRequest:false,
            orderModalData: orderMock,
            isLoading: false,
        })
    })

    test('вызов createOrder.rejected', () => {
        const errorMessage = "Ошибка"
        const newState = orderReducer(orderInitialState, { type: createOrder.rejected.type, error: { message: errorMessage } })

        expect(newState).toEqual({
            ...orderInitialState,
            orderRequest:false,
            isLoading: false,
        })
    })
})
