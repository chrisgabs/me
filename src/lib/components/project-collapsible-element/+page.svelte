<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ChevronDown } from "lucide-svelte";
    import Gallery from "$lib/components/utility/gallery.svelte";
    import { onMount } from "svelte";
    export let title:string = "title";
    export let images:string[] = [];
    export let shortDescription:string = "";
    export let longDescription:string = "";
    export let tags:string[] = [];
    export let githubLink:string = ""
    export let liveLink:string = ""
    export let galleryIsExpandable:boolean = true;
    export let allCollapsibleOpen:boolean = false;
    export let expandedByDefault:boolean = true;
    let collapsibleOpen:boolean = false;
    
    $: collapsibleOpen = allCollapsibleOpen;
    $: chevronRotation = collapsibleOpen ? "rotate-180" : "rotate-0";

    onMount(() => {
        collapsibleOpen = expandedByDefault;
    });

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
                {#if shortDescription !== ""}
                    <p class="text-sm leading-relaxed tracking-wide">{shortDescription}</p>
                {/if}
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
        
        {#if images.length > 0}
            <Gallery images={images} galleryIsExpandable={galleryIsExpandable} />
        {/if}

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
                     Project Link
                 </a>
            {/if}
        </div>
    </Collapsible.Content>
</Collapsible.Root>

