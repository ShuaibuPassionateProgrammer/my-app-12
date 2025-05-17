import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { FormEventHandler, FormEvent, ChangeEvent } from "react";
import { Textarea } from "@headlessui/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Edit',
        href: '/posts',
    },
];

export default function PostEdit() {
    const { post } = usePage().props;

    const { data, setData, errors, post: postForm } = useForm({
        title: post.title || "",
        body: post.body
    });

    const submit: FormEventHandler = (e: FormEvent<Element>) => {
        e.preventDefault();
        post(route("posts.store"));
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <Link 
                        href={route('posts.index')}
                        className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-600 cursor-pointer">
                        Back
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setData("title", e.target.value)}
                            autoComplete="off"
                            placeholder="Title" />

                        <InputError className="mt-2" message={errors.title} />

                        <Label htmlFor="body">Body</Label>
                        <Textarea
                            id="body"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={data.body}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData("body", e.target.value)}
                            autoComplete="body"></Textarea>

                        <InputError className="mt-2" message={errors.body} />

                        <div>
                            <Button className="cursor-pointer">Save</Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
