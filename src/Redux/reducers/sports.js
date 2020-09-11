import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import fetch from 'node-fetch'
const APIEndpoint = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t='

export const fetchSportTeam = createAsyncThunk(
    'post/fetchSportTeamInfo',
    async (city,team) => {
        let postsURL = APIEndpoint
        if (city && team) {
            postsURL += `${city}_${team}`
        }
        try {
            const response = await fetch(postsURL)
            const json = await response.json()
            return Promise.resolve(json)
        } catch (e) {
            return Promise.resolve(e)
        }
    }
)

export const fetchSportsCity = createAsyncThunk(
    'post/fetchSportsCityInfo',
    async (city) => {
        let postsURL = APIEndpoint
        if (city) {
            postsURL += city 
        }
        try {
            const response = await fetch(postsURL)
            const json = await response.json()
            return Promise.resolve(json)
        } catch (e) {
            return Promise.resolve(e)
        }
    }
)


export const postsInitialState = {
    posts: {
        status: 'idle',
        data: {},
        error: {}
    }
}


export const sportSlices = createSlice({
    name : 'sports',
    initialState: postsInitialState,
    reducers : {
        printState : (state) => {
            console.dir(state.posts.data)
        }
    },
    extraReducers: {
        [fetchSportsCity.pending]: (state, action) => {
            console.log('pending...')
            state.posts = {
                status: 'loading',
                data: {},
                error: {}
            }
        },
        [fetchSportsCity.rejected]: (state, action) => {
            console.log('rejected...')
            state.posts = {
                status: 'idle',
                data: {},
                error: action.payload
            }
        },
        [fetchSportsCity.fulfilled]: (state, action) => {
            console.log('fulfilled...')
            const {payload:{teams}} = action
            if(teams){
                const sports = [...new Set(teams.map( item => item.strSport))].sort()
                state.posts.data.sports = sports
                state.posts.data.teams = teams
                state.posts.status = 'done'
                state.posts.error = {}
            } else {
                state.posts.data = {}
                state.posts.status = 'done'
                state.posts.error = {info:'No team was selected'}
            }
            console.log({state})
        },

    }
})

export const { printState } = sportSlices.actions
export const selectPost = state => state;
export const extraReducers = sportSlices.caseReducers
export default sportSlices.reducer