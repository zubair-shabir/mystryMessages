import dbConnect from "@/lib/dcConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          message: " user not found",
          success: false,
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          message: " User is not Accepting the messages",
          success: false,
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        message: "Message sent Successfully... ",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unable to send Message", error);
    return Response.json(
      {
        message: " Interval Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
