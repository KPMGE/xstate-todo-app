'use client'
import { useMachine } from "@xstate/react"
import { todosMachine } from "../machines"

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      fetchTodos: () => new Promise((resolve, reject) => {
        setTimeout(() => resolve(['todo1', 'todo 2']), 1000)
      })
    },
  })

  return (
    <div>
      <pre>
        STATE: {JSON.stringify(state.value)}
      </pre>

      <pre>
        CONTEXT: {JSON.stringify(state.context)}
      </pre>
    </div>
  )
}
