import { createMachine } from "xstate";

export const machine = createMachine({
  initial: "notHovered",
  states: {
    notHovered: {
      on: {
        HOVER: {
          target: 'hovered'
        }
      }
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: 'notHovered'
        }
      }
    }
  }
})
