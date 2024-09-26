import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dcConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: " not Authenticated",
        success: false,
      },
      { status: 400 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          message: " Failed to Update user status ti accept messages",
          success: false,
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: " Messages Acceptance Status updated Successfully",
        success: true,
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to Update user status ti accept messages");
    return Response.json(
      {
        message: " Failed to Update user status ti accept messages",
        success: false,
      },
      { status: 500 }
    );
  }

  {
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: " not Authenticated",
        success: false,
      },
      { status: 400 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          message: " User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        isAcceptingMessages: foundUser.isAcceptingMessage,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance Status", error);
    return Response.json(
      {
        message: " Error in getting message acceptance Status",
        success: false,
      },
      { status: 500 }
    );
  }
}
