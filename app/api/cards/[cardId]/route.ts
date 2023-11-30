import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  console.log(params.cardId);
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findMany({
      where: {
        id: params.cardId,
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });
    console.log(card);
    return NextResponse.json(card[0]);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
