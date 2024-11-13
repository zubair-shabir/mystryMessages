"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import {
    X,
    ExternalLink,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
} from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProp = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProp) => {
    const { toast } = useToast();

    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(
            `/api/delete-message/${message._id}`
        );
        toast({
            title: response.data.message,
        });
        onMessageDelete(message?._id as string);
    };
    const handleShareMessage = (socialUrl: string) => {
        if (socialUrl == "instagram") {
            window.open(
                `instagram://story-camera?source=share&url=${encodeURIComponent(
                    message.content
                )}`,
                "_blank"
            );
        }
        const shareUrl = `https://www.${socialUrl}.com/share?text=${encodeURIComponent(
            message.content
        )}`;
        window.open(shareUrl, "_blank");
    };
    const handleCopyMessage = () => {
        navigator.clipboard.writeText(message.content);
        toast({
            title: "Message Copied ",
        });
    };
    return (
        <Card className="card-bordered">
            <CardHeader>
                <div className="flex justify-between items-center gap-6 ">
                    <CardTitle>{message.content}</CardTitle>
                    <div className="flex gap-4">


                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="default">
                                    <ExternalLink className="text-white" />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="flex flex-col gap-10">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Share Your Message!</AlertDialogTitle>
                                    <AlertDialogDescription className="flex items-center justify-between p-4 text-gray-700 bg-gray-200 rounded-xl ">
                                        <h4 className="select-none ">{message.content}</h4>
                                        <AlertDialogAction onClick={handleCopyMessage}>
                                            Copy
                                        </AlertDialogAction>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex gap-5 sm:justify-center sm:flex-row items-center">
                                    <AlertDialogAction
                                        className="inline-block md:hidden"
                                        onClick={() => handleShareMessage("instagram")}
                                    >
                                        <Instagram />
                                    </AlertDialogAction>
                                    <AlertDialogAction
                                        className=""
                                        onClick={() => handleShareMessage("facebook")}
                                    >
                                        <Facebook />
                                    </AlertDialogAction>
                                    <AlertDialogAction
                                        onClick={() => handleShareMessage("linkedin")}
                                    >
                                        <Linkedin />
                                    </AlertDialogAction>
                                    <AlertDialogAction onClick={() => handleShareMessage("x")}>
                                        <Twitter />
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <X className="w-5 h-5" />
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        this message.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteConfirm}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <div className="text-sm">
                    {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
                </div>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
};

export default MessageCard;
