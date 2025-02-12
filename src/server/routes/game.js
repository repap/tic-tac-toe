export function createGameElement(){
  const game = document.querySelector('#game-wrapper')

    const elements = new Array(9).fill(null)

    let lastValue = ''

    elements.forEach((_, i) => {
      const div = document.createElement('div')
      
      div.dataset.field = i

      div.addEventListener('click', e => {
        console.log('click')
        console.log(e.target.innerHTML)
        const currentValue = event.target.innerHTML
        
        if(!currentValue) {
          e.target.innerHTML = lastValue = lastValue !== 'X' ? 'X' : 'O'
        }

        const field = event.target.dataset.field

        if(!currentValue) {
          return
        }

        socket.makeMove(field)
      })
      game.append(div)
    })
}