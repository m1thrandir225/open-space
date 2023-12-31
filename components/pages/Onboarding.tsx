"use client";

import React from "react";

import {useMutation, useQuery} from "@tanstack/react-query";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import type {Database} from "@/lib/types/db";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowRightIcon,
  Contact,
  PlusIcon,
  XIcon,
} from "lucide-react";
import * as z from "zod";
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import Image from "next/image";

type OnboardingProps = {
  user: Session["user"];
};

/*
1. Username
2. First name
3. Last name

1..3 profile mutation:


4. Skillset
Tags mutation:
- Check if tags exists
- If tag does not exist create tag
- If tag exists create userTag
 */

const FormSchema = z.object({
  username: z.string().min(3).max(32).optional(),
  firstName: z.string().min(3).max(32),
  lastName: z.string().min(3).max(32),
  skills: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().min(1).max(32),
      })
    )
    .min(1, "You must have at least one skill")
    .max(15, "You can only have 15 skills"),
});

type FormSchema = z.infer<typeof FormSchema>;

const Onboarding: React.FC<OnboardingProps> = ({user}) => {
  // console.log(user);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
  });

  const dynamicForm = useFieldArray<FormSchema>({
    control: form.control,
    name: "skills",
    rules: {
      maxLength: 15,
    },
  });

  const skillsInputRef = React.useRef<HTMLInputElement>(null);

  const suggestedSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Next.js",
    "Tailwind CSS",
  ];

  const handleNewSkill = () => {
    if (!skillsInputRef.current?.value) return;

    if (
      dynamicForm.fields.find(
        (field) => field.name === skillsInputRef.current?.value
      )
    )
      return;
    dynamicForm.append({
      id: dynamicForm.fields.length + 1,
      name: skillsInputRef.current?.value,
    });

    skillsInputRef.current!.value = "";
  };

  const appendSuggestedSkill = (name: string) => {
    dynamicForm.append({
      id: dynamicForm.fields.length + 1,
      name: name,
    });
    suggestedSkills.filter((item) => item !== name);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (dynamicForm.fields.length >= 15) return;
    if (e.key === "Enter") {
      handleNewSkill();
    }
  };

  const updateProfileMutation = useMutation(async (formData: FormSchema) => {
    const {data, error} = await supabase
      .from("profiles")
      .update({
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })
      .eq("id", user.id);
    if (error) throw new Error(error.message);

    return data;
  });

  const updateSkillsMutation = useMutation(async (formData: FormSchema) => {
    const {data, error} = await supabase
      .from("tags")
      .upsert(
        formData.skills.map((skill) => ({
          name: skill.name,
        }))
      )
      .select();

    if (error) throw new Error(error.message);

    console.log(data);
    const {data: userTagData, error: userTagError} = await supabase
      .from("userTags")
      .insert(
        data.map((tag) => ({
          user_id: user.id,
          tag_id: tag.id,
        }))
      )
      .select();

    if (userTagError) throw new Error(userTagError.message);

    return "Success";
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      await updateProfileMutation.mutateAsync(data);
      await updateSkillsMutation.mutateAsync(data);
      form.reset();
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (updateProfileMutation.isLoading || updateSkillsMutation.isLoading) {
    return <div> Loading ... </div>;
  }

  return (
    <div className={"w-full h-screen"}>
      <div
        className={
          "container mx-auto w-full h-full flex flex-row justify-between items-center"
        }
      >
        <div
          className={
            "flex flex-col gap-6 w-full items-start justify-start max-w-[400px]"
          }
        >
          <h1 className={"text-3xl leading-3 font-semibold mb-2"}>
            Customize your profile
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-full items-start justify-start"
            >
              <FormField
                control={form.control}
                name={"firstName"}
                render={({field}) => (
                  <FormItem className={"w-full"}>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder={"Benjamin"} {...field} />
                    </FormControl>
                    {form.formState.errors.firstName && (
                      <FormMessage>
                        {form.formState.errors.firstName.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"lastName"}
                render={({field}) => (
                  <FormItem className={"w-full"}>
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input placeholder={"Zindl"} {...field} />
                    </FormControl>
                    {form.formState.errors.lastName && (
                      <FormMessage>
                        {form.formState.errors.lastName.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"username"}
                render={({field}) => (
                  <FormItem className={"w-full"}>
                    <FormLabel> Username </FormLabel>
                    <FormControl>
                      <Input placeholder={"Shredder"} {...field} />
                    </FormControl>
                    {form.formState.errors.username && (
                      <FormMessage>
                        {form.formState.errors.username.message}
                      </FormMessage>
                    )}
                    <FormDescription> * Optional </FormDescription>
                  </FormItem>
                )}
              />
              <div className={"flex flex-col gap-4 w-full"}>
                <h1 className={"text-2xl font-medium"}>Enter your skills</h1>
                <div
                  className={"flex flex-row justify-center items-center gap-2"}
                >
                  <Input
                    placeholder={"Enter a skill"}
                    onKeyPress={onKeyPress}
                    ref={skillsInputRef}
                  />

                  <Button
                    onClick={() => handleNewSkill()}
                    disabled={dynamicForm.fields.length >= 15}
                  >
                    <PlusIcon size={24} />
                  </Button>
                </div>

                <div
                  className={
                    "flex flex-row items-center justify-start gap-2 w-full flex-wrap"
                  }
                >
                  {dynamicForm.fields.map((field, index) => (
                    <Badge
                      key={field.id}
                      onClick={() => dynamicForm.remove(index)}
                      className={
                        " cursor-pointer flex flex-row items-center justify-center gap-2"
                      }
                    >
                      {field.name}
                      <XIcon size={16} />
                    </Badge>
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.skills?.message}
                </FormMessage>
                <div
                  className={
                    "flex flex-col items-start justify-start gap-4 w-full"
                  }
                >
                  <h1 className={"text-sm"}> Suggested </h1>
                  <div
                    className={
                      "flex flex-row items-center justify-start gap-2 w-full flex-wrap"
                    }
                  >
                    {suggestedSkills.map((item, index) => {
                      return (
                        <Badge
                          onClick={() => appendSuggestedSkill(item)}
                          variant={"outline"}
                          key={index}
                          className={
                            "cursor-pointer flex flex-row items-center justify-center gap-2 hover:border-accent-foreground"
                          }
                        >
                          {item}
                          <PlusIcon size={16} />
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
              <Button
                type={"submit"}
                className={
                  "flex flex-row items-center justify-center w-full gap-6"
                }
              >
                Continue
                <ArrowRightIcon size={24} />
              </Button>
            </form>
          </Form>
        </div>

        <Image
          src={"/perfect-landing.svg"}
          alt={"Onboarding"}
          width={800}
          height={600}
        />
      </div>
    </div>
  );
};

export default Onboarding;
