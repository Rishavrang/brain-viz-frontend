import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Brain from './components/Brain'
import BrainPoint from './components/BrainPoint'
import './App.css'

function App() {
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages ] = useState([])
  const [inputText, setInputText] = useState("")
  const [coordinates, setCoordinates] = useState([])

  async function startConversation() {
    const response = await fetch('http://127.0.0.1:8000/new-conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'React Chat' })
    });
    const data = await response.json();
    setConversationId(data.id);
  }

  useEffect(() => {
    startConversation();
  }, []);

  async function sendMessage() {
    if (!inputText) return;

    const userMessage = { role: "user", content: inputText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText("");

    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.content, conversation_id: conversationId })
    });
    const data = await response.json();

    const assistantMessage = { role: "assistant", content: data.reply };
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
    setCoordinates(data.coordinates);
  }

  return (
    <div>
      <div style={{width: '100%', height: '500px'}}>
        <Canvas camera={{position: [0,0,5]}}>
          <ambientLight intensity={1}/>
          <directionalLight position={[5,5,5]}/>
          <Brain />
          <OrbitControls
            target={[0,0,0]}
            minDistance={2}
            maxDistance={10}
          />
            {coordinates.map((coord, index) => (
              <BrainPoint key={index} x={coord.x} y={coord.y} z={coord.z}/>
            ))}
        </Canvas>
      </div>
      <h2>Brain Viz Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.role}: {msg.content}</div>
      ))}
    </div>
    <input
      type="text"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    />
    <button onClick={sendMessage}>Send</button>
    </div>
  )
}
export default App