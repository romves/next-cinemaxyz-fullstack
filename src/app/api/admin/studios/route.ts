import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { name } = await request.json();

  try {
    const newStudio = await db.studio.create({
      data: { name },
    });

    return new Response(JSON.stringify(newStudio));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
