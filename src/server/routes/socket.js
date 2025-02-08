const ws = new WebSocket('/')

const chatContainer = document.querySelector('#chat .wrapper')
const sendBtn = document.querySelector('#send button')
const sendMsgContainer = document.querySelector('#send input')

sendBtn.addEventListener('click', (event) => {
  event.preventDefault()

  const msg = sendMsgContainer.value

  console.log(msg)
  ws.send(JSON.stringify({msg}))

  sendMsgContainer.value = ''
})

ws.addEventListener('open', (event) => {
  console.log('open', event.data)
})

ws.addEventListener('message', (event) => {
  console.log('message', event.data)
  const msg = JSON.parse(event.data).msg
  const msgElement = document.createElement('P')
  msgElement.innerText = msg
  chatContainer.append(msgElement)
  
  chatContainer.parentNode.scroll({
    left: 0, 
    top: chatContainer.offsetHeight, 
    behavior: 'smooth',
  })
})

ws.addEventListener('close', (event) => {
  console.log('close', event.code, event.reason)
})

ws.addEventListener('error', (event) => {
  console.error('error', event)
})