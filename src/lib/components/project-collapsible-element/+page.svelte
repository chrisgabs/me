<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ChevronDown } from "lucide-svelte";
    
    export let title:string = "title";
    export let image:string = "/";
    export let shortDescription:string = "short description";
    export let longDescription:string = "long description";
    export let tags:string[] = [];
    export let githubLink:string = ""
    export let liveLink:string = ""

    let imageExpanded:boolean = false;

    export let allCollapsibleOpen:boolean = false;
    let collapsibleOpen:boolean = false;
    
    $: collapsibleOpen = allCollapsibleOpen;
    $: chevronRotation = collapsibleOpen ? "rotate-180" : "rotate-0";

</script>

<!-- <ul class="flex gap-2 group-hover:mb-2">
    {#each tags as badge}
            <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
    {/each}
</ul> -->
<Collapsible.Root class="w-full h-fit border border-r-4 rounded-sm border-slate-700" bind:open={collapsibleOpen}>
    <Collapsible.Trigger class="flex justify-between items-center w-full p-4">
        <div class="flex flex-col gap-1 text-start">
            <div class="flex flex-col flex-wrap lg:w-full">
                <h3 class="text-lg font-bold text-start">{title}</h3>
                <p class="text-sm leading-relaxed tracking-wide">{shortDescription}</p>
            </div>
            {#if !collapsibleOpen}
            <ul class="flex flex-wrap gap-2 group-hover:mb-2">
                {#each tags as tag}
                <li><Badge variant="secondary" class="bg-inherit border border-slate-700">{tag}</Badge></li>
                <!-- <li class="text-xs font-semibold">{badge} |</li> -->
                {/each}
            </ul>
            {/if}
        </div>
		<ChevronDown class="h-6 w-6 transition-transform duration-300 {chevronRotation}" />
    </Collapsible.Trigger>
    <Collapsible.Content class="flex flex-col gap-4 p-4 pt-0">
        <button on:click={() => {imageExpanded = !imageExpanded;}} 
            class="group relative"
        >
            <figure class="{imageExpanded ? "aspect-w-16 aspect-h-9" : "aspect-w-3 aspect-h-1"} overflow-hidden mb-2 rounded-sm border border-slate-700 transition-all">
                <img src="{image}" alt="asdasd" class="object-cover w-full h-full"/>
            </figure>
            {#if imageExpanded}
                 <svg class="lucide lucide-expand absolute bottom-5 right-3 opacity-10 group-hover:opacity-85 " xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
            {:else}
                 <svg class="lucide lucide-expand absolute bottom-5 right-3 opacity-10 group-hover:opacity-85" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
            {/if}
        </button>

        <ul class="flex flex-wrap gap-2 group-hover:mb-2">
            {#each tags as tag}
                    <li><Badge variant="secondary" class="neo-badge">{tag}</Badge></li>
            {/each}
        </ul>

        <p class="text-sm leading-relaxed tracking-wide">{longDescription}</p>

        <div class="{githubLink == "" && liveLink == "" ? "hidden" : ""} flex gap-3">
            {#if githubLink !== ""}
                 <a href="{githubLink}" target=”_blank” class="link after:ml-1 font-semibold text-sm hover:underline underline-offset-4">
                     Github
                 </a>
            {/if}
            {#if liveLink !== ""}
                 <a href="{liveLink}" target=”_blank” class="link after:ml-1 font-semibold text-sm hover:underline underline-offset-4">
                     Live Demo
                 </a>
            {/if}
        </div>
    </Collapsible.Content>
</Collapsible.Root>

