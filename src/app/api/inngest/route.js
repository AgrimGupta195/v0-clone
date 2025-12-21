import "server-only";

export const runtime = "nodejs";

async function handler(req) {
  const { serve } = await import("inngest/next");
  const { inngest } = await import("../../../inngest/client");
  const { codeAgentFunction } = await import("../../../inngest/functions");

  return serve({
    client: inngest,
    functions: [codeAgentFunction],
  })(req);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
