import { createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    id: "Todos machine",
    initial: "Loading todos",
    states: {
      "Loading todos": {
        on: {
          "Todos loaded": {
            target: "Todos Loaded successfully",
          },
          "Loading todos failed": {
            target: "Load todos failed",
          },
        },
      },
      "Todos Loaded successfully": {},
      "Load todos failed": {},
    },
    schema: { events: {} as { type: "Todos loaded" } | { type: "Loading todos failed" } },
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {},
    services: {},
    guards: {},
    delays: {},
  },
);
