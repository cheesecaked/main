import { configureAbly, useChannel } from '@ably-labs/react-hooks'
import { useState } from 'react'


configureAbly({ key: '-TDDJA.wfHEYQ:TSL8k8-ht5w1IJW65t0L6Q5SC75-Ic1Mxa8K1Y5VGNo', clientId: Date.now() + '' })


export default function Home() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<any>([])

  const [channel] = useChannel('public-chat', (message: any) => {
    setMessages((prev: any) => [...prev, message])
  })

  async function sendMessage() {
    channel.publish('message', { text, date: Date.now() })
    setText('')
  }
  return (
    <main>
      {
        messages.map((message: any) => (
          <div className='chat chat-start'>
            <div className='chat-bubble'>{message.data.text}</div>
          </div>
        ))
      }
      <textarea className='textarea' value={text} onChange={(e) => setText(e.target.value)} />
      <button type='button' className='btn' onClick={sendMessage}>
        send
      </button>
    </main>
  )
}
