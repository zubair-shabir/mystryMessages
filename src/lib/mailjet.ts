import mailjet from "node-mailjet";

export const mailjetClient = new mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC!,
    apiSecret: process.env.MJ_APIKEY_PRIVATE!,
  });
