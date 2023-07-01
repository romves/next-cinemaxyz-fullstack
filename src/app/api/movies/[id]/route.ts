import { db } from "@/lib/db";

type ParamsType = {
  id: string;
};

export async function GET(request: Request, { params }: {params: ParamsType}) {
  const { id } = params;
  try {
    const movie = await db.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (movie) {
      return new Response(JSON.stringify(movie));
    } else {
      return new Response("Movie not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
