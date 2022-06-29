import { createStore} from "@reduxjs/toolkit";
import { scoreReducer } from "./scoreReducer";
import { combineReducers } from "@reduxjs/toolkit";


export const store = createStore(scoreReducer) 
