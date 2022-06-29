import { store } from "./store"

export interface Score{
    id: number,
    nick: string, 
    score: number
}

export interface scoreState {
    scoreboard: Score[]
}

const initialState = {
    scoreboard: []
}


export type addAction = {type: "ADD_SCORE", payload:string}
export type editAction = {type: "EDIT_SCORE", payload:{id:number, score: number}}
type Action = addAction | editAction

export const scoreReducer = (state:scoreState = initialState, action:Action):scoreState => {
    switch(action.type){
        case 'ADD_SCORE':{
            const d = new Date();
            return {...state, scoreboard:[...state.scoreboard, {id:d.getTime(),nick:action.payload, score:0}]}
        }
        case 'EDIT_SCORE':{

            return {
                ...state, scoreboard: [
                   ...state.scoreboard.map((item:Score):Score=>{
                     if(item.id===action.payload.id){
                        return {...item, score:action.payload.score}
                     } else{
                        return item
                     }
                   })
                ] 
            }
        }

        default:
            return state
    }
} 