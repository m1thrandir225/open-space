"use client";
import React from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";




export default function Page() {
    return (
        <div className=" mx-auto w-full flex items-center justify-center">
        <div className="px-6 py-8">
                <div className="max-w-6xl mx-auto mt-10 lg:mt-20 space-y-6">
                    <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
                        <div className="col-span-4 lg:text-center lg:pt-14 mb-10">
                            <img src="#" alt=""
                                 className="rounded-xl"/>

                                <p className="mt-4 block text-gray-400 text-xs">
                                    Published <span>1 day ago</span></p>

                                <div className="flex items-center lg:justify-center text-sm mt-4">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkusqbGzdZwsxIMmcFfFZCfrfKNmIsQpiz_qF7WdTWw&s" alt="avatar"/>
                                        <div className="ml-3 text-left"/>
                                            Author: <h5 className="font-bold"><a
                                            href="/authors/sebastijan"> Sebastijan Zindl </a></h5>
                                        </div>
                                </div>
                        </div>

                        <div className="col-span-8">
                            <div className="hidden lg:flex justify-between mb-6">
                                <a href="/"
                                   className="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-blue-500">
                                    <svg width="22" height="22" viewBox="0 0 22 22" className="mr-2">
                                        <g fill="none" fillRule="evenodd">
                                            <path stroke="#000" strokeOpacity=".012" strokeWidth=".5" d="M21 1v20.16H.84V1z">
                                            </path>
                                            <path className="fill-current"
                                                  d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z">
                                            </path>
                                        </g>
                                    </svg>

                                    Back to Posts
                                </a>

                            </div>

                            <div className="space-x-2">
                                <a href="/categories/{{$post->category->slug}}"
                                   className="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold"

                                >Biology</a>
                                <a href="/categories/{{$post->category->slug}}"
                                   className="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold"

                                >Programming</a>
                            </div>


                            <h1 className="font-bold text-3xl lg:text-4xl mb-10">
                                Save the marine life
                            </h1>

                            <div className="space-y-4 lg:text-lg leading-loose">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.</p>

                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur.</p>

                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium,
                                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                                    vitae
                                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                    fugit.</p>

                                <h2 className="font-bold text-lg">Sed quia consequuntur</h2>

                                <p>Magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                                    dolorem
                                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                    tempora
                                    incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

                                <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
                                    nisi ut
                                    aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate
                                    velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
                                    nulla</p>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.</p>

                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur.</p>

                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                    laudantium,
                                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                                    vitae
                                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                    fugit.</p>
                            </div>
                        </div>
                    </div>

                <div>
                    <form method="POST" action="/posts/{{$post->slug}}/comments"
                          className="border border-gray-200 p-6 rounded-xl">
                        <header className="flex items-center">
                            <img src="https://i.pravatar.cc/60?u={{auth()->id() }}" alt="" width="60" height="60"
                                 className="rounded-full"/>
                                <h2 className="ml-4">Want to participate</h2>
                        </header>
                        <div className="mt-8">
                    <textarea name="body" className="w-full text-sm" cols="30" rows="10" placeholder="Write a comment">

                    </textarea>
                        </div>
                        <div>
                            <Button type="submit"
                               >Post
                            </Button>
                        </div>
                    </form>
                    <article className="flex bg-gray-100 border border-gray-200 p-6 rounded-xl space-x-4">
                        <div className="flex-shrink-0">
                            <img src="https://i.pravatar.cc/60?u={{$comment->id }}" alt="" width="60" height="60"
                                 className="rounded-xl"/>
                        </div>

                        <div>
                            <header className="mb-4">
                                <h3 className="font-bold">Ljubica Ristovska</h3>

                                <p className="text-xs">
                                    Posted
                                    <div>12:30</div>
                                </p>
                            </header>

                            <p>
                                What a wonderful project. I want to contribute.
                            </p>
                        </div>
                    </article>

                </div>
                <div id="newsletter"
                        className="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
                    <img src="#" alt="" className="mx-auto -mb-6"/>
                        <h5 className="text-3xl">You can contribute here.</h5>
                        <p className="text-sm">We wish you happy working together.</p>

                        <div className="mt-10">
                            <div className="relative inline-block mx-auto lg:bg-gray-200 rounded-full ">
                                <form method="POST" action="/newsletter" className="lg:flex text-sm">
                                    <div
                                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24"
                                                     fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <Label htmlFor="file-upload"
                                                       className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <Input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                                                </Label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, PDF, ... up to 10MB</p>
                                        </div>
                                    </div>


                                </form>
                                <Button type="submit">
                                Contribute
                            </Button>
                            </div>
                            <div className="lg:py-3 lg:px-5 flex items-center">
                                <label htmlFor="email" className="hidden lg:inline-block"/>
                                <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/512/2343/2343791.png" alt="mailbox letter"/>

                                <p>If you want to keep in touch by email leave your email here</p>
                                <div className="block">
                                    <input name='email' id="email" type="text" placeholder="Your email address"
                                           className="lg:bg-transparent pl-4 focus-within:outline-none"/>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

