import { createGameElement } from "./game.js";

const states = ['createPlayer', 'welcome','game']

export function updateGuiState(state){
  const {guiState} = state
  
  if(!guiState || !states.includes(guiState)) {
    throw new Error('no such gui state known')
  }
  
    switch(true) {
      case guiState === 'createPlayer': return document.querySelector('dialog').showModal()
      case guiState === 'welcome': return toggleGuiState('#welcome')
      case guiState === 'game': 
        toggleGuiState('#game')
        createGameElement()
        return
  }
}

function toggleGuiState(queryStr){
  document.querySelectorAll('.gui-state')
    .forEach(e => e.classList.add('hidden'))
      
  document.querySelector(queryStr)
    .classList.remove('hidden')
}