<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import Gallery from "$lib/components/utility/gallery.svelte";

    export let title:string = "title";
    export let images:string[] = [];
    export let description:string = "description";
    export let tags:string[] = [];
    export let githubLink:string = ""
    export let liveLink:string = ""
    export let galleryIsExpandable:boolean = true;

</script>

<li>
    <div class="flex flex-col justify-between rounded-sm p-4 border-l border-t border-b-4 border-r-4 border-slate-700 max-w-xl md:min-h-[29rem] lg:max-w-xs lg:snap-center" >
    <!-- <div class="flex flex-col gap-1 p-4 border shadow-md max-w-xl lg:max-w-xs lg:snap-center"> -->
        <div class="flex flex-col gap-1">
            <h3 class="mb-3">
                <span class="inline-flex font-bold text-lg">
                    {title}
                </span>
            </h3>

            <Gallery images={images} class="mb-2 rounded-sm" galleryIsExpandable={galleryIsExpandable}/>

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