import type { Route } from "./+types/healthcheck";
import { prisma } from "~/utils/database.server";

export async function loader({ request }: Route.LoaderArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    await Promise.all([
      prisma.userAccount.findFirst({ select: { id: true } }),
      fetch(`${new URL(request.url).protocol}//${host}`, {
        headers: { "X-Healthcheck": "true" },
        method: "HEAD",
      }).then((response) => {
        if (!response.ok) return Promise.reject(response);
      }),
    ]);
    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
}
