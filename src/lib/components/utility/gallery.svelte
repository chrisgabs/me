<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
    
    export let images:string[] = [];

	export let className:string = "";
	export { className as class };


    let api: CarouselAPI;
    let apiOptions = {
        loop: true,
        active: images.length > 1,
    }

    let imageExpanded:boolean = false;

</script>

<button on:click={(e) => {imageExpanded = !imageExpanded}} class={className}>
<Carousel.Root bind:api opts={apiOptions} class="group rounded-sm border border-slate-700" >
    
    <Carousel.Content>
        {#each images as image}
        <Carousel.Item class="{imageExpanded ? "aspect-w-16 aspect-h-9" : "aspect-w-3 aspect-h-1"} overflow-hidden transition-all">
            <img src="{image}" alt="asdasd" class="object-cover w-full h-full"/>
        </Carousel.Item>
        {/each}
    </Carousel.Content>

    {#if images.length !== 1}
         <div class="{imageExpanded ? "flex" : "hidden"} gap-2 absolute left-3 bottom-3">
             <button class="flex items-center justify-center bg-white rounded-full opacity-70 border border-b-2 border-slate-700 hover:opacity-100" on:click={(e) => {
                 api.scrollPrev();
                 e.stopPropagation();
             }}>
                 <svg class="lucide lucide-chevron-left mx-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
     
             </button>
             <button class="flex items-center justify-center bg-white rounded-full opacity-70 border border-b-2 border-slate-700 hover:opacity-100" on:click={(e) => {
                 api.scrollNext();
                 e.stopPropagation();
             }}>
                 <svg class="lucide lucide-chevron-right mx-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
             </button>
         </div>
    {/if}
    
    <div class="absolute bottom-3 right-3" >
        {#if imageExpanded}
                <svg class="lucide lucide-expand opacity-85 " xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
        {:else}
                <svg class="lucide lucide-expand opacity-10 group-hover:opacity-85" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
        {/if}
    </div>
</Carousel.Root>
</button>