'use client'
import { useMachine } from "@xstate/react"
import { todosMachine } from "../machines"

const fakeTodos = new Set<string>(['todo1', 'todo2'])

export default function Home() {
  const [state, send] = useMachine(todosMachine, {
    services: {
      fetchTodos: () => new Promise((resolve, reject) => {
        setTimeout(() => resolve(Array.from(fakeTodos)), 1000)
      }),
      saveTodo: async (context, event) => fakeTodos.add(context.createTodoFormInput)
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
        <form onSubmit={(e) => {
          e.preventDefault()
          send("Submit")
        }}>
          <input
            className="border-2 border-gray-500"
            placeholder="Enter your new todo"
            onChange={e => send({
              type: 'Form Input Changed',
              value: e.target.value
            })}
          />
        </form>
      }
    </div>
  )
}
