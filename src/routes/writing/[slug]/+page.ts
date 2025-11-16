import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { SvelteComponent } from 'svelte';
import type { PostData } from '$lib/types/writing';

type PostModule = {
    default: typeof SvelteComponent<any>;
    metadata?: Record<string, any>;
};

const posts = import.meta.glob('$lib/content/writing/posts/**/content.md');

export const load: PageLoad = async ({ params }): Promise<PostData> => {
    const match = Object.entries(posts).find(([path]) =>
        path.includes(`/writing/posts/${params.slug}/content.md`)
    );

    if (!match) {
        throw error(404, "Post not found");
    }

    const loader = match[1];
    const post = await loader() as PostModule;

    return {
        title: post.metadata?.title,
        date: post.metadata?.date,
        description: post.metadata?.description,
        content: post.default,
    };
};