<svelte:head>
    <title>{data.title}</title> 
</svelte:head>

<script lang="ts">
    import type { PostData } from '$lib/types/writing';
    export let data: PostData;
</script>

<div class="flex flex-col w-full h-full px-12 sm:max-w-2xl sm:mx-auto md:min-w-fit md:mx-auto lg:mx-auto lg:justify-between xl:px-20">
    <header class="flex flex-col gap-3 pt-24 mb-16 ">
            <a href="/" class="flex gap-2 items-center font-semibold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                Home
            </a>
        <h1 class="text-4xl font-bold tracking-tight">{data.title}</h1>
        <p class="max-w-xs leading-normal">{data.description}</p>
        <p class="max-w-xs leading-normal">{data.date}</p>
    </header>

    <div class="flex flex-col gap-6 md:flex-row md:min-w-fit">
        <content class="flex grow flex-col gap-6 pb-12 w-full md:w-[32rem] lg:w-[36rem] transition-all">
            <article class="prose">
                <svelte:component this={data.content} />
            </article>
        </content>
    </div>
</div>