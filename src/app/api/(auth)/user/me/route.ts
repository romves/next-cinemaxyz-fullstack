import { db } from "@/lib/db";

export async function GET(request: Request) {
  const userId = request.headers.get("userid");

  try {
    if (!userId) {
      return new Response("User not found", { status: 404 });
    }

    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        username: true,
        fullname: true,
        age: true,
        balance: true,
      },
    });

    if (user) {
      return new Response(JSON.stringify(user));
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { data: profileDetails } = await request.json();
  const userId = request.headers.get('userid');

  try {
    if (!userId) {
      return new Response('User not found', { status: 404 });
    }

    const parsedUserId = parseInt(userId);

    const user = await db.user.findUnique({ where: { id: parsedUserId } });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { id: parsedUserId },
      data: {
        fullname: profileDetails.name,
        age: profileDetails.age,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
