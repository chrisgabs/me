<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ChevronDown } from "lucide-svelte";
    
    export let title:string = "title";
    export let image:string = "/";
    export let shortDescription:string = "short description";
    export let longDescription:string = "long description";
    export let tags:string[] = [];

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
            <ul class="flex gap-2 group-hover:mb-2">
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
        <figure class="aspect-w-3 aspect-h-1 overflow-hidden mb-2 rounded-sm border border-slate-700">
            <img src="{image}" alt="asdasd" class="object-cover w-full h-full"/>
        </figure>

        <ul class="flex gap-2 group-hover:mb-2">
            {#each tags as tag}
                    <li><Badge variant="secondary" class="neo-badge">{tag}</Badge></li>
            {/each}
        </ul>

        <p class="text-sm leading-relaxed tracking-wide">{longDescription}</p>

        <div class="flex gap-3">
            <a href="/" target=”_blank” class="link after:ml-1 font-semibold text-sm hover:underline underline-offset-4">
                Github
            </a>
            <a href="/" target=”_blank” class="link after:ml-1 font-semibold text-sm hover:underline underline-offset-4">
                Live Demo
            </a>
        </div>
    </Collapsible.Content>
</Collapsible.Root>

