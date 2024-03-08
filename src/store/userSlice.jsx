import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: {name: 'chloe', age: 27},
    reducers : {
        changeName(state){
            state.name = 'choi'
        },
        increaseAge(state, a){
            state.age+= a.payload
        }
    }
})

export let { changeName, increaseAge} = user.actions

export default user