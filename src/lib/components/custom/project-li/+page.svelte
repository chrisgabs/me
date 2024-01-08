<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    export let title:string = "title";
    export let image:string = "/";
    export let description:string = "description";
    export let techBadges:string[] = [];

</script>

<li>
    <div class="flex flex-col gap-1 p-4 bg-gradient-to-b from-stone-100 border-b-2 border-r-2 border-slate-200">
        <h3 class="mb-3">
            <span class="inline-flex font-semibold text-lg">
                {title}
            </span>
        </h3>
        <div class="aspect-w-3 aspect-h-1 overflow-hidden mb-2 outline outline-1 rounded-sm outline-slate-200">
            <img src="{image}" alt={title} class="object-cover w-full h-full"/>
        </div>
        <ul class="flex gap-2 mb-3">
            {#each techBadges as badge}
                    <li><Badge variant="secondary">{badge}</Badge></li>
            {/each}
        </ul>
        <p class="leading-relaxed mb-2 text-sm tracking-wide">{description}</p>
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
    </div>
</li>