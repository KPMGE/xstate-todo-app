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
              "Submit": {
                target: "Saving Todo"
              }
            },
          },
          "Saving Todo": {
            invoke: {
              src: "saveTodo",
              id: "Save Todo",
              onDone: [
                {
                  target: "#Todos machine.Loading todos"
                }
              ],
              onError: {
                target: "Showing form input",
                actions: {
                  type: "assignErrorToContext"
                }
              }
            }
          },
        },
      },

    },
    schema: {
      services: {} as {
        fetchTodos: {
          data: string[]
        },
        saveTodo: {
          data: void
        }
      },
      events: {} as {
        type: "Create new todo"
      } | {
        type: "Form Input Changed"
        value: string
      } | {
        type: "Submit"
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
    }
  },
)
