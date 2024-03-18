import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from "./store/userSlice";

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name: 'White and Black', count : 2},
        {id : 2, name: 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){
            let idNum = state.findIndex((a)=>{ return a === action.payload })
            // 좀 더 확실하게 확인하고 내용 추가해줌, 같은 데이터가 몇번째 항목인지 확인시켜줌
            state[idNum].count++
        },
        addItem(state, action){
            state.push(action.payload)
        }
    }
})

export let { addCount, addItem } = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer
    }
})