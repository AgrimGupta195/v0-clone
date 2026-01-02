import { EventSchemas, Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "v0-clone",
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey:
    process.env.NODE_ENV === "development"
      ? false
      : process.env.INNGEST_SIGNING_KEY,
});