"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { useToast } from "@/hooks/use-toast";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [isUiLoading, SetIsUiLoading] = useState(true)
  const [suggestedMessages, setSuggestedMessages] =
    useState(initialMessageString);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [AcceptingMessages, setAcceptingMessages] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserAcceptingMessages = async () => {
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-message?username=${username}`);
      setAcceptingMessages(response.data.isAcceptingMessages as boolean);

    } catch (error) {
      console.log("error", error);
    } finally {
      SetIsUiLoading(false)
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setSuggestedMessages(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch suggested messages",
      });
      console.error("Error fetching messages:", error);
    } finally {
      setIsSuggestLoading(false);
    }
  };
  const { toast } = useToast();

  useEffect(() => {
    fetchUserAcceptingMessages();
  }, []);
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      {AcceptingMessages ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading || !messageContent}>
                    Send It
                  </Button>
                )}
              </div>
            </form>
          </Form>{" "}
          <div className="space-y-4 my-8">
            <div className="space-y-2">
              <Button
                onClick={fetchSuggestedMessages}
                className="my-4"
                disabled={isSuggestLoading}
              >
                Suggest Messages
              </Button>
              <p>Click on any message below to select it.</p>
            </div>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Messages</h3>
              </CardHeader>
              <CardContent className="flex flex-col space-y-4">
                {parseStringMessages(suggestedMessages).map(
                  (message, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mb-2"
                      onClick={() => handleMessageClick(message)}
                    >
                      {message}
                    </Button>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl ">
          {isUiLoading ? <Loader2 className="h-32 w-32 animate-spin mx-auto" /> : 'User Not Accepting Messages Right Now!!'}

        </h2>
      )}

      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
