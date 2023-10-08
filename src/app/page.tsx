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
      saveTodo: async (context, event) => fakeTodos.add(context.createTodoFormInput),
      deleteTodo: async (context, event) => fakeTodos.delete(event.value)
    },
  })

  return (
    <div>
      <pre>
        STATE: {JSON.stringify(state.value)}
      </pre>

      {state.context.todos.map(todo => (
        <div key={todo} className="mb-5">
          <span className="bg-blue-100 mr-3 p-1">{todo}</span>
          <button className="bg-red-200" onClick={() => send({ type: 'Delete Todo', value: todo })}>Delete</button>
        </div>
      ))}

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
