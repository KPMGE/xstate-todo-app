import { createMachine, assign } from "xstate";

export const todosMachine = createMachine(
  {
    id: "Todos machine",
    initial: "Loading todos",
    context: {
      todos: [] as string[],
      errorMessage: undefined
    },
    states: {
      "Loading todos": {
        invoke: {
          src: "fetchTodos",
          id: "fetchTodos",
          onDone: [
            {
              target: "Todos Loaded successfully",
              actions: 'assignTodosToContext'
            },
          ],
          onError: [
            {
              target: "Load todos failed",
              actions: 'assignErrorToContext'
            },
          ],
        },
      },
      "Todos Loaded successfully": {},
      "Load todos failed": {},
    },
    schema: {
      services: {} as {
        fetchTodos: {
          data: string[]
        }
      }
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data
        }
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message
        }
      })
    },
    guards: {},
    delays: {},
  },
)
