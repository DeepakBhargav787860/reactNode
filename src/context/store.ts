import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/auth';


const reducer = combineReducers({
    auth: authReducer
})

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;