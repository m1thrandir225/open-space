"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {GithubIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React from "react";

export default function Page() {
    //TODO add the heading and the menu bar when sara submits
    return (
        <div className=" mx-auto w-full flex items-center justify-center">
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so
                        be careful what you share.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <Label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</Label>

                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="sm:col-span-5">
                                    <img className="inline-block rounded-full ring-2 ring-white"
                                         src="data:image/jpeg;base64,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"
                                         alt=""/>
                                </div>
                                <div className="col-span-full">

                                    <div
                                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                                     fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                          clip-rule="evenodd"/>
                                                </svg>
                                                <Label htmlFor="file-upload"
                                                       className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <Input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                                </Label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <Label htmlFor="about"
                                   className="block text-sm font-medium leading-6 text-gray-900">About</Label>
                            <div className="mt-2">
                                <textarea id="about" name="about" rows="3"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about
                                yourself.</p>
                        </div>

                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive
                        mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <Label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">First and last name
                            </Label>
                            <div className="mt-2">
                                <Input id="name" name="name" type="name" autoComplete="name"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <Label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username
                            </Label>
                            <div className="mt-2">
                                <Input id="username" name="username" type="username" autoComplete="username"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <Label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                                address</Label>
                            <div className="mt-2">
                                <Input id="email" name="email" type="email" autoComplete="email"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">We will always let you know about important
                        changes, but you pick what else you want to hear about.</p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <Input id="comments" name="comments" type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <Label htmlFor="comments" className="font-medium text-gray-900">Comments</Label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a
                                            posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <Input id="candidates" name="candidates" type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <Label htmlFor="candidates"
                                               className="font-medium text-gray-900">Candidates</Label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a
                                            job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <Input id="offers" name="offers" type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <Label htmlFor="offers" className="font-medium text-gray-900">Offers</Label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an
                                            offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                </button>
            </div>
        </form>
        </div>
    );

}