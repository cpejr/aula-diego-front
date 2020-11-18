import { createStore } from 'redux'

function alunosReducer(state =[], action = {}) {
    if(action.type==='CARREGARLISTADEALUNOS'){
        return [...action]
        
    }
    return state;
  }

window.store=store

export const store = createStore(alunosReducer)





