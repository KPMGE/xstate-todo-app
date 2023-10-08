import { createMachine, assign } from "xstate";

export const todosMachine = createMachine(
  {
    id: "Todos machine",
    initial: "Loading todos",
    context: {
      todos: [] as string[],
      errorMessage: undefined,
      createTodoFormInput: ''
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
      "Todos Loaded successfully": {
        on: {
          "Create new todo": {
            target: "Creating new todo"
          }
        }
      },
      "Load todos failed": {},
      "Creating new todo": {
        initial: "Showing form input",
        states: {
          "Showing form input": {
            on: {
              "Form Input Changed": {
                actions: {
                  type: "assignFormInputToContext",
                },
                internal: true,
              },
            },
          },
        },
      },

    },
    schema: {
      services: {} as {
        fetchTodos: {
          data: string[]
        }
      },
      events: {} as {
        type: "Create new todo"
      } | {
        type: "Form Input Changed"
        value: string
      }
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      assignTodosToContext: assign((_context, event) => {
        return {
          todos: event.data
        }
      }),
      assignErrorToContext: assign((_context, event) => {
        return {
          errorMessage: (event.data as Error).message
        }
      }),
      assignFormInputToContext: assign((_context, event) => {
        return {
          createTodoFormInput: event.value
        }
      })
    },
    guards: {},
    delays: {},
  },
)
