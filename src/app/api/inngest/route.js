import "server-only";

export const runtime = "nodejs";

async function handler(req) {
  const { serve } = await import("inngest/next");
  const { inngest, codeAgentFunction, healthCheckFunction } = await import("../../../inngest");

  const fn = serve({
    client: inngest,
    functions: [codeAgentFunction, healthCheckFunction],
  });

  try {
    const start = Date.now();
    const res = await fn(req);
    const ms = Date.now() - start;
    console.log(`Inngest handler completed in ${ms}ms`);
    return res;
  } catch (err) {
    console.error("Inngest serve error:", err?.stack || err);
    return new Response("Inngest serve error", { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
