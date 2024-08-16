import { Player } from '../../../packages/roplayer/src'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <>
      <Player></Player>
    </>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
