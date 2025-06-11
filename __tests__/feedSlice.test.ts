import { expect, test, describe } from '@jest/globals';
import { TOrdersData } from "../src/utils/types"
import feedReducer, { initialState as feedInitialState, fetchFeeds } from "../src/slices/feedSlice"
describe('Проверка вызова экшена Request', () => {
    const orderMock:TOrdersData = {
        "orders": [
            {
                "_id": "68486566c2f30c001cb2b6c9",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093d",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa093d"
                ],
                "status": "done",
                "name": "Флюоресцентный люминесцентный бургер",
                "createdAt": "2025-06-10T17:03:34.523Z",
                "updatedAt": "2025-06-10T17:03:35.229Z",
                "number": 80897
            },
            {
                "_id": "68486449c2f30c001cb2b6c3",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093d",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa0940"
                ],
                "status": "done",
                "name": "Space флюоресцентный метеоритный бургер",
                "createdAt": "2025-06-10T16:58:49.678Z",
                "updatedAt": "2025-06-10T16:58:50.467Z",
                "number": 80896
            },
],
        "total": 8020,
        "totalToday": 2
    }

    test('вызов fetchFeeds.pending', ()=>{
        const newState = feedReducer(feedInitialState,{type:fetchFeeds.pending.type})

        expect(newState).toEqual({
            ...feedInitialState,
            loading:true,
            error:null
        })
    })

      test('вызов fetchFeeds.fulfilled', ()=>{
        const newState = feedReducer(feedInitialState,{type:fetchFeeds.fulfilled.type, payload:orderMock})

        expect(newState).toEqual({
            ...feedInitialState,
            orders:orderMock.orders,
            total:orderMock.total,
            totalToday:orderMock.totalToday,
            loading:false,
            error:null
        })
    })

      test('вызов fetchFeeds.rejected', ()=>{
        const errorMessage = "Ошибка"
        const newState = feedReducer(feedInitialState,{type:fetchFeeds.rejected.type, error:{message: errorMessage}})

        expect(newState).toEqual({
            ...feedInitialState,
            loading:false,
            error:errorMessage
        })
    })
})
