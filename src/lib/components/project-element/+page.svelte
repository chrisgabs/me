<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    export let title:string = "title";
    export let image:string = "/";
    export let description:string = "description";
    export let tags:string[] = [];
    export let githubLink:string = ""
    export let liveLink:string = ""

    let imageExpanded:boolean = false;

</script>

<li>
    <div class="flex flex-col justify-between rounded-sm p-4 border-l border-t border-b-4 border-r-4 border-slate-700 max-w-xl md:min-h-[28rem] lg:max-w-xs lg:snap-center" >
    <!-- <div class="flex flex-col gap-1 p-4 border shadow-md max-w-xl lg:max-w-xs lg:snap-center"> -->
        <div class="flex flex-col gap-1">
            <h3 class="mb-3">
                <span class="inline-flex font-bold text-lg">
                    {title}
                </span>
            </h3>
            <button on:click={() => {imageExpanded = !imageExpanded;}} 
                class="group relative"
            >
                <figure class="{imageExpanded ? "aspect-w-16 aspect-h-9" : "aspect-w-3 aspect-h-1"} overflow-hidden mb-2 rounded-sm border border-slate-700 transition-all">
                    <img src="{image}" alt="asdasd" class="object-cover w-full h-full"/>
                </figure>
                {#if imageExpanded}
                    <svg class="lucide lucide-expand absolute bottom-5 right-3 opacity-5 group-hover:opacity-50 " xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
                {:else}
                    <svg class="lucide lucide-expand absolute bottom-5 right-3 opacity-5 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
                {/if}
            </button>
            <ul class="flex gap-2 mb-3 flex-wrap">
                {#each tags as tag}
                        <li><Badge variant="secondary" class="neo-badge">{tag}</Badge></li>
                {/each}
            </ul>
            <p class="leading-relaxed mb-2 text-sm tracking-wide">{description}</p>
        </div>

        <div class="flex gap-3">
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
    </div>
</li>