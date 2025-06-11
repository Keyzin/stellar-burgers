import { expect, test, describe } from '@jest/globals';
import { TOrder } from "../src/utils/types"
import orderUserReducer, { initialState as userOrdersInitialState, userOrders } from "../src/slices/orderUserSlice"
describe('Проверка вызова экшена Request', () => {

    const orderUserMock: TOrder[] = [
        {
            "_id": "68334d74c2f30c001cb26ede",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2025-05-25T17:03:48.313Z",
            "updatedAt": "2025-05-25T17:03:49.045Z",
            "number": 78750
        },
        {
            "_id": "68334d82c2f30c001cb26ee0",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0940",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Флюоресцентный люминесцентный метеоритный бургер",
            "createdAt": "2025-05-25T17:04:02.671Z",
            "updatedAt": "2025-05-25T17:04:03.339Z",
            "number": 78751
        },
    ]

    test('вызов userOrders.pending', () => {
        const newState = orderUserReducer(userOrdersInitialState, { type: userOrders.pending.type })

        expect(newState).toEqual({
            ...userOrdersInitialState,
            loading: true,
            error:null
        })
    })

    test('вызов userOrders.fulfilled', () => {
        const newState = orderUserReducer(userOrdersInitialState, { type: userOrders.fulfilled.type, payload: orderUserMock })

        expect(newState).toEqual({
            ...userOrdersInitialState,
            orders:orderUserMock,
            loading: false,
            error:null
        })
    })

    test('вызов userOrders.rejected', () => {
        const errorMessage = "Ошибка"
        const newState = orderUserReducer(userOrdersInitialState, { type: userOrders.rejected.type, error: { message: errorMessage } })

        expect(newState).toEqual({
            ...userOrdersInitialState,
            loading:false,
            error:errorMessage
        })
    })
})
