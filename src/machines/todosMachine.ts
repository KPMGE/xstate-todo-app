import { createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    id: "Todos machine",
    initial: "Loading todos",
    states: {
      "Loading todos": {
        invoke: {
          src: "fetchTodos",
          id: "fetchTodos",
          onDone: [
            {
              target: "Todos Loaded successfully",
            },
          ],
          onError: [
            {
              target: "Load todos failed",
            },
          ],
        },
      },
      "Todos Loaded successfully": {},
      "Load todos failed": {},
    },
    schema: {
      services: {} as {
        'loadTodos': {
          data: string[]
        }
      }
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    guards: {},
    delays: {},
  },
)
