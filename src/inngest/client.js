import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "v0-clone",
  // Add your Inngest signing key from environment variables if using Inngest Cloud
  signingKey: process.env.INNGEST_SIGNING_KEY,
});