<script lang="ts">
    import gradientImage from '$lib/assets/gradient.jpg';
    import { Badge } from "$lib/components/ui/badge";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ChevronDown } from "lucide-svelte";
    import { onMount } from 'svelte';
    
    export let techBadges:string[] = [];
    export let allCollapsibleOpen:boolean = false;
    let collapsibleOpen:boolean = false;
    
    $: collapsibleOpen = allCollapsibleOpen;
    $: chevronRotation = collapsibleOpen ? "rotate-180" : "rotate-0";

</script>

<!-- <ul class="flex gap-2 group-hover:mb-2">
    {#each techBadges as badge}
            <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
    {/each}
</ul> -->
<Collapsible.Root class="w-full h-fit border border-r-4 border-slate-700" bind:open={collapsibleOpen}>
    <Collapsible.Trigger class="flex justify-between items-center w-full p-4">
        <div class="flex flex-col gap-2 text-start">
            <div class="flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:w-full">
                <h3 class="text-lg font-bold text-start">TicTacToe 2</h3>
                <p class="text-sm leading-relaxed tracking-wide">Play with your friends</p>
            </div>
            {#if !collapsibleOpen}
            <ul class="hidden lg:flex gap-2 group-hover:mb-2">
                {#each techBadges as badge}
                <li><Badge variant="secondary" class="bg-inherit border border-slate-700">{badge}</Badge></li>
                <!-- <li class="text-xs font-semibold">{badge} |</li> -->
                {/each}
            </ul>
            {/if}
        </div>
		<ChevronDown class="h-6 w-6 transition-transform duration-300 {chevronRotation}" />
    </Collapsible.Trigger>
    <Collapsible.Content class="flex flex-col gap-4 p-4 pt-0">
        <figure class="aspect-w-3 aspect-h-1 overflow-hidden mb-2 rounded-sm border border-slate-700">
            <img src="{gradientImage}" alt="asdasd" class="object-cover w-full h-full"/>
        </figure>

        <ul class="flex gap-2 group-hover:mb-2">
            {#each techBadges as badge}
                    <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
            {/each}
        </ul>

        <p class="text-sm leading-relaxed tracking-wide">Developed in Golang and deployed on AWS, offers a multiplayer experience for up to four players concurrently across multiple rooms. The real-time feature enables players to observe live moves as participants drag their pieces during gameplay, facilitated through WebSocket technology.</p>

        <div class="flex gap-3">
            <button class="">
                <span class="inline-flex items-center gap-1 font-semibold text-sm hover:underline underline-offset-4">
                    Github
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </span>
            </button>
            <button class="">
                <span class="inline-flex items-center gap-1 font-semibold text-sm hover:underline underline-offset-4">
                    Live Demo
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </span>
            </button>
        </div>
    </Collapsible.Content>
</Collapsible.Root>

