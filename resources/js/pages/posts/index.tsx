import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { FormEventHandler } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts() {
    const { posts } = usePage().props;

    const {delete: destroy} = useForm();

    const destroyPost: FormEventHandler = (e: any, id: any): void => {};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto">
                    <Link 
                        href={route('posts.create')}
                        className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-600 cursor-pointer">
                        Create post
                    </Link>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Id</th>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Body</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(({id, title, body}: {id: any; title: any; body: any}) => (
                                <tr key={id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark">
                                    <td className="px-6 py-2 font-medium text-gray-900 dark:text-white">{id}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{title}</td>
                                    <td className="px-6 py-2 text-gray-600 dark:text-gray-300">{body}</td>
                                    <td className="px-6 py-2">
                                        <form onSubmit={(e: FormEvent<HTMLFormElement>): any => destroyPost(e, id)}>
                                        <Link
                                            href={route("posts.edit", id)}
                                            className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-600 cursor-pointer">
                                            Edit
                                        </Link>
                                        <button className="px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-600 ml-1 cursor-pointer">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
