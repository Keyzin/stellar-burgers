import { expect, test, describe } from '@jest/globals';
import { TUser } from "../src/utils/types"
import userReducer, { initialState as userInitialState, updateUser, loginUser, registerUser, logoutUser, forgotPassword, resetPassword, checkUserAuth } from "../src/slices/userSlice"
describe('Проверка вызова экшена Request', () => {

    const userMock: TUser = {
        email: "test.test@mail.ru",
        name: "Даниил"
    }

    const updateUserMock = {
        ...userInitialState,
        user: {
            email: "oldtest@mail.ru",
            name: "Иван"
        }
    };

    const userWithPassMock = {
        email: "test.test@mail.ru",
        name: "Даниил",
        password: 'test123'
    }

    describe('проверка updateUser', () => {


        test('вызов updateUser.pending', () => {
            const newState = userReducer(userInitialState, { type: updateUser.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов updateUser.fulfilled', () => {
            const newState = userReducer(updateUserMock, { type: updateUser.fulfilled.type, payload: { user: userMock } })

            expect(newState).toEqual({
                ...updateUserMock,
                user: userMock,
                loading: false,
                error: null
            })
        })

        test('вызов updateUser.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...updateUserMock, loading: true }, { type: updateUser.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...updateUserMock,
                loading: false,
                error: errorMessage
            })
        })
    })

    describe('проверка loginUser', () => {

        test('вызов loginUser.pending', () => {
            const newState = userReducer(userInitialState, { type: loginUser.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов loginUser.fulfilled', () => {
            const newState = userReducer(userInitialState, { type: loginUser.fulfilled.type, payload: { user: userMock } })

            expect(newState).toEqual({
                user: userMock,
                loading: false,
                isAuthChecked: true,
                error: null
            })
        })

        test('вызов loginUser.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: loginUser.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage
            })
        })
    })

    describe('проверка registerUser', () => {

        test('вызов registerUser.pending', () => {
            const newState = userReducer(userInitialState, { type: registerUser.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов registerUser.fulfilled', () => {
            const newState = userReducer(userInitialState, { type: registerUser.fulfilled.type, payload: { user: userWithPassMock } })

            expect(newState).toEqual({
                user: userWithPassMock,
                loading: false,
                isAuthChecked: true,
                error: null
            })
        })

        test('вызов registerUser.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: registerUser.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage
            })
        })

    })

    describe('проверка logoutUser', () => {

        test('вызов logoutUser.pending', () => {
            const newState = userReducer(userInitialState, { type: logoutUser.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов logoutUser.fulfilled', () => {
            const newState = userReducer(userInitialState, { type: logoutUser.fulfilled.type, payload: { user: userMock } })

            expect(newState).toEqual({
                user: null,
                loading: false,
                isAuthChecked: false,
                error: null
            })
        })

        test('вызов logoutUser.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: logoutUser.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage
            })
        })
    })

    describe('проверка checkUserAuth', () => {

            test('вызов checkUserAuth.pending', () => {
            const newState = userReducer(userInitialState, { type: checkUserAuth.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов checkUserAuth.fulfilled', () => {
            const newState = userReducer(userInitialState, { type: checkUserAuth.fulfilled.type, payload: userMock  })

            expect(newState).toEqual({
                user: userMock,
                loading: false,
                isAuthChecked:true,
                error: null
            })
        })

        test('вызов checkUserAuth.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: checkUserAuth.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage,
                isAuthChecked:true,
            })
        })

    })

     describe('проверка forgotPassword', () => {

            test('вызов forgotPassword.pending', () => {
            const newState = userReducer(userInitialState, { type: forgotPassword.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов forgotPassword.fulfilled', () => {
            const newState = userReducer({ ...userInitialState, loading:true }, { type: forgotPassword.fulfilled.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
            })
        })

        test('вызов forgotPassword.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: forgotPassword.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage,
            })
        })

    })

     describe('проверка resetPassword', () => {

            test('вызов resetPassword.pending', () => {
            const newState = userReducer(userInitialState, { type: resetPassword.pending.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: true,
                error: null
            })
        })

        test('вызов resetPassword.fulfilled', () => {
            const newState = userReducer({ ...userInitialState, loading:true }, { type: resetPassword.fulfilled.type })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
            })
        })

        test('вызов resetPassword.rejected', () => {
            const errorMessage = "Ошибка"
            const newState = userReducer({ ...userInitialState, loading: true }, { type: resetPassword.rejected.type, error: { message: errorMessage } })

            expect(newState).toEqual({
                ...userInitialState,
                loading: false,
                error: errorMessage,
            })
        })

    })

})
