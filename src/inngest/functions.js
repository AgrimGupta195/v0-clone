import { inngest } from "./client";
import {gemini,createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "agent/hello.world" },
  async ({ event, step }) => {
    const helloAgent = createAgent({
        name: "Hello World Agent",
        description: "An agent that responds to hello world events",
        system: "You are a friendly agent that responds to hello world events.",
        model: gemini({model: "gemini-2.5-flash" }),
    })

    const{ output } = await helloAgent.run("hello to user")
    return{
        message: output[0].content
    }
  },

);

