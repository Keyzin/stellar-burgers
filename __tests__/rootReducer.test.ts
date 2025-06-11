import { rootReducer } from "../src/services/store"
import { initialState as constructorInitialState } from "../src/slices/constructorSlice"
import { initialState as feedInitialState } from "../src/slices/feedSlice"
import { initialState as ingredientsInitialState } from "../src/slices/ingredientsSlice"
import { initialState as orderInitialState } from "../src/slices/orderSlice"
import { initialState as orderUserInitialState } from "../src/slices/orderUserSlice"
import { initialState as userInitialState } from "../src/slices/userSlice"


describe('проверка инициализации rootReducer', () => {
    let initialState: ReturnType<typeof rootReducer>;

    beforeEach(()=>{
        initialState = rootReducer(undefined, { type: 'unknown' });
    })

    it('проверяем правильность структуры', ()=>{
        expect(initialState).toEqual({
        ingredients: ingredientsInitialState,
        burgerConstructor: constructorInitialState,
        order: orderInitialState,
        feed: feedInitialState,
        user: userInitialState,
        userOrders: orderUserInitialState
    })
    })

    it('проверяем initial state для слайсов', ()=>{
        expect(initialState.ingredients).toEqual(ingredientsInitialState);
        expect(initialState.burgerConstructor).toEqual(constructorInitialState);
        expect(initialState.feed).toEqual(feedInitialState);
        expect(initialState.order).toEqual(orderInitialState);
        expect(initialState.userOrders).toEqual(orderUserInitialState);
        expect(initialState.user).toEqual(userInitialState);
    })
  
})