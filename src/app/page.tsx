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

      {state.matches('Todos Loaded successfully') &&
        <button onClick={() => send('Create new todo')}>CREATE NEW TODO</button>
      }

      {state.matches('Creating new todo.Showing form input') &&
        <input
          className="border-2 border-gray-500"
          placeholder="Enter your new todo"
          onChange={e => send({
            type: 'Form Input Changed',
            value: e.target.value
          })}
        />
      }
    </div>
  )
}
