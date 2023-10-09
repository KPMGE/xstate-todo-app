'use client'
import React from 'react'
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

  const isLoadingTodos = state.matches('Loading todos')

  return (
    <div className="h-screen flex flex-col items-center justify-center" >
      {isLoadingTodos && <div>Loading todos...</div>}

      {state.matches('Todos Loaded successfully') &&
        <button
          className="bg-green-300 p-2 rounded-md"
          onClick={() => send('Create new todo')}
        >
          CREATE NEW TODO
        </button>
      }
      <div className="w-[300px] flex flex-col gap-6 mt-3">
        {!isLoadingTodos && state.context.todos.map(todo => (
          <div className='flex justify-between bg-blue-100 p-2 rounded-md'>
            <span className="">{todo}</span>
            <button className="bg-red-300 px-1 rounded-sm" onClick={() => send({ type: 'Delete Todo', value: todo })}>Delete</button>
          </div>
        ))}
      </div>

      {state.matches('Creating new todo.Showing form input') &&
        <form
          className='mt-3'
          onSubmit={(e) => {
            e.preventDefault()
            send("Submit")
          }}
        >
          <input
            className="w-[300px] border-2 border-gray-400 rounded-md p-2 focus:border-gray-500 outline-none"
            placeholder="Enter the new todo"
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
