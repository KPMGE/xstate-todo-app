'use client'
import { useMachine } from "@xstate/react"
import { todosMachine } from "../machines"

export default function Home() {
  const [state, send] = useMachine(todosMachine)

  return (
    <div>
      <pre>
        {JSON.stringify(state.value)}
      </pre>

      <button
        onClick={() => send('Todos loaded')}
      >
        todos loaded
      </button>

      <br />

      <button
        onClick={() => send('Loading todos failed')}
      >
        Loading todos failed
      </button>
    </div>
  )
}
