import { combineReducers } from '@reduxjs/toolkit'
import SportsReducer from './reducers/sports'

export const RootState = combineReducers({
    SportsReducer
})

export default RootState
