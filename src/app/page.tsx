'use client'
import { useMachine } from "@xstate/react"
import { machine } from "../machines/firstMachine"

export default function Home() {
  const [state, send] = useMachine(machine)

  return (
    <div>
      <pre>
        {JSON.stringify(state.value)}
      </pre>

      <button
        onClick={() => send({ type: 'HOVER' })}
      >
        TRIGGER HOVER EVENT
      </button>

      <br />

      <button
        onClick={() => send({ type: 'MOUSEOUT' })}
      >
        TRIGGER MOUSEOUT EVENT
      </button>
    </div>
  )
}
