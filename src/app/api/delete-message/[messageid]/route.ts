import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();

  const session = await getServerSession(authOptions);

  const _user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: " not Authenticated",
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    const updatedResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if ((updatedResult.modifiedCount = 0)) {
      return Response.json(
        {
          message: " message not found!",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: " Message Deleted!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in deleting Message", error);
    return Response.json(
      {
        message: " Error deleting message!",
        success: false,
      },
      { status: 500 }
    );
  }
}
