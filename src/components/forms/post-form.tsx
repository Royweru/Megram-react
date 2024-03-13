import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FileUploader } from "../shared/file-uploader";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from 'zod'
import { postSchema } from "@/lib/schemas";

import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";

interface PostFormProps{
    post?:Models.Document
}
export const PostForm = ({post}:PostFormProps) => {

    const {mutateAsync:createPost,isPending:isLoadingCreate} =useCreatePost()
    const {user} = useUserContext()
    const navigate = useNavigate()
  const form = useForm<z.infer<typeof postSchema>>({
    resolver:zodResolver(postSchema),
    defaultValues:{
        caption:post?post?.caption:"",
        file:[],
        location:post?post?.location:"",
        tags:post?post.tags.join(','):""
    }
  });

  const onSubmit =async (vals:z.infer<typeof postSchema>) => {
     const newPost =await createPost({
        ...vals,
        userId:user.id,
     })
     if(!newPost){
        toast.error("Please try again",{style:{"background":"red"}})
     }
     navigate("/")
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          name="caption"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          name="file"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">File</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags( Seaparated by a comma)
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Art , Expression, life"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className=" flex gap-4 justify-end items-center">
          <Button type="button" className="shad-button_dark_4">
            CANCEL
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
          >
            SUBMIT
          </Button>
        </div>
      </form>
    </Form>
  );
};
