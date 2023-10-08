"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Database} from "@/lib/types/db";
import {zodResolver} from "@hookform/resolvers/zod";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ArrowLeft, PlusIcon} from "lucide-react";
import Link from "next/link";
import React from "react";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import * as z from "zod";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ScrollArea} from "@/components/ui/scroll-area";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  links: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
    })
  ),
  expertise: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});

type FormSchema = z.infer<typeof schema>;

const CreateProject: React.FC = () => {
  const supabase = createClientComponentClient<Database>();

  const userData = useQuery(["user"], async () => {
    const {data, error} = await supabase.auth.getUser();

    if (error) {
      throw error;
    }
    return data.user;
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      links: [
        {
          id: "1",
          url: "",
        },
      ],
    },
  });

  const dnyamicForm = useFieldArray<FormSchema>({
    name: "links",
    control: form.control,
  });

  const createProjectMutation = useMutation(async (formData: FormSchema) => {
    console.log(userData.data);
    const {data, error} = await supabase.from("projects").insert([
      {
        description: formData.description,
        name: formData.name,
        image: formData.image,
        links: JSON.stringify(formData.links),
        expertise: formData.expertise,
        user_id: userData.data?.id!!,
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await createProjectMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (userData.isLoading) {
    return <h1> Loading </h1>;
  }

  return (
    <div className="container mx-auto">
      <Button asChild>
        <Link
          href="/dashboard"
          className="flex flex-row items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </Button>

      <h1 className="text-3xl font-bold my-4">Create A New Project</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Project Name </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Supabase" />
                  </FormControl>
                  <FormDescription> The project name </FormDescription>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Lorem Impsum" />
                  </FormControl>
                  <FormDescription> The project description </FormDescription>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="image"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription> The project image </FormDescription>
                </FormItem>
              );
            }}
          />
          <div className="flex flex-col items-start justify-start gap-4 w-full">
            <div className="flex flex-row items-center justify-start gap-2 w-full">
              <h1 className="text-xl font-bold">Links</h1>
              <Button
                variant="ghost"
                className="flex flex-row gap-4 items-center justify-center"
                onClick={() =>
                  dnyamicForm.append({
                    id: (dnyamicForm.fields.length + 1).toString(),
                    url: "",
                  })
                }
              >
                <PlusIcon size={16} />
                Add Link
              </Button>
            </div>

            <ScrollArea className="w-full px-2 max-h-[250px]">
              {dnyamicForm.fields.map((field, index) => {
                return (
                  <FormField
                    control={form.control}
                    name={`links.${index}.url`}
                    key={field.id}
                    render={({field}) => {
                      return (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://supabase.io"
                            />
                          </FormControl>
                          <FormDescription> The project link </FormDescription>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </ScrollArea>
          </div>

          <FormField
            control={form.control}
            name="expertise"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Expetise</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BEGINNER" />
                        </FormControl>
                        <FormLabel className="font-normal">Beginner</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="intermediate" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Intermediate
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ADVANCED" />
                        </FormControl>
                        <FormLabel className="font-normal">Advanced</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    What kind of contributor expetise are you looking for ?
                  </FormDescription>
                </FormItem>
              );
            }}
          />
          <Button type="submit"> Create </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProject;
