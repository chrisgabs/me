<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import gradientImage from '$lib/assets/gradient.jpg';
    import ProjectLarge from '$lib/components/custom/project-large/+page.svelte';
    import ProjectSmall from '$lib/components/custom/project-small/+page.svelte';
</script>

<div class="xl:hidden sm:block md:sticky left-0 top-0 bg-slate-950 sm:bg-slate-500 md:bg-yellow-500 lg:bg-yellow-300 xl:bg-slate-50 w-full h-[5px]"></div>

<div class="flex flex-col w-full h-full px-12 sm:max-w-2xl sm:mx-auto md:max-w-full md:mx-0 lg:mx-auto lg:justify-between xl:px-20">

    <!-- <button class="sticky top-4 left-0 w-10 h-10 rounded-lg bg-slate-300">

    </button> -->

    <header class="pt-24 mb-16">
        <h1 class="text-4xl font-bold tracking-tight">Projects Archive</h1>
        <!-- <h2 class="mt-2 text-lg font-medium tracking-tight sm:text-xl">Applications Engineer at Oracle</h2> -->
        <p class="mt-3 max-w-xs leading-normal">Here are some of the projects I've been working on since I've learned how to code.</p>
    </header>

    <content class="flex flex-col gap-4 w-full pb-12">
        
        <!-- TODO: Turn this into an accordion -->
        <ProjectLarge techBadges={["Golang", "SvelteKit", "DevOps", "AWS"]}/>
        <ProjectSmall techBadges={["Golang", "SvelteKit", "DevOps", "AWS"]}/>
        <ProjectSmall techBadges={["Golang", "SvelteKit", "DevOps", "AWS"]}/>
        <ProjectSmall techBadges={["Golang", "SvelteKit", "DevOps", "AWS"]}/>
    </content>

</div>