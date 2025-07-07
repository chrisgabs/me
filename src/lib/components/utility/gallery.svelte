<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import { type CarouselAPI } from "$lib/components/ui/carousel/context.js";
    import { Dialog } from "bits-ui";
    import { flyAndScale } from "$lib/utils";
    import { fade } from "svelte/transition";

    export let images:string[] = [];
    export let galleryIsExpandable:boolean = true;
	export let className:string = "";
	export { className as class };


    let api: CarouselAPI;
    let apiOptions = {
        loop: true,
        active: images.length > 1,
    }

    let dialogOpened:boolean = false;

    // Attempt to fix frozen scroll on mobile when dialog is closed by pressing #dialog-toggle.
    // $: {
    //     let toggle:HTMLButtonElement = document.getElementById("dialog-toggle") as HTMLButtonElement;
    //     if (toggle !== null && dialogOpened) {
    //         toggle.disabled = true;
    //         setTimeout(()=> {
    //             console.log("pressable")
    //             toggle.disabled = false;
    //         }, 1000);
    //     }
    // }

    function handleClick() {
        if (galleryIsExpandable) {
            dialogOpened = !dialogOpened;
        }
    }

</script>

<button id="dialog-toggle" on:click={handleClick} class={className}>
<Carousel.Root bind:api opts={apiOptions} class="group border border-slate-700 rounded-sm {galleryIsExpandable ? '' : 'cursor-default'}" >
    
    <Carousel.Content>
        {#each images as image}
        <Carousel.Item class="flex items-center justify-center aspect-w-3 aspect-h-1 overflow-hidden transition-all">
            {#if image.split(".")[image.split(".").length-1] === "webp" || image.split(".")[image.split(".").length-1] === "png"}
                 <img src="{image}" alt={image} class="object-cover rounded-sm w-full h-full"/>
            {:else}
                 <video autoplay muted src="{image}" class="object-cover rounded-sm w-full h-full"/>
            {/if}
        </Carousel.Item>
        {/each}
    </Carousel.Content>

    {#if galleryIsExpandable}
        <div class="absolute bottom-3 right-3 bg-white p-1 border border-slate-700 rounded-md opacity-15 group-hover:opacity-85 transition-all duration-300" >
            <svg class="lucide lucide-expand" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
        </div>
    {/if}
</Carousel.Root>
</button>

<Dialog.Root bind:open={dialogOpened}>
    <Dialog.Portal>
    <Dialog.Overlay
        transition={fade}
        transitionConfig={{ duration: 200 }}
        class="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
    />
    <Dialog.Content
        transition={flyAndScale}
        class=" fixed left-[50%] top-[50%] z-50 w-full mr-20 max-w-6xl translate-x-[-50%] translate-y-[-50%] bg-background shadow-popover outline-none bg-inherit"
    >

        <Carousel.Root bind:api opts={apiOptions} class="group mx-5 border rounded-sm border-slate-700" >
            
            <Carousel.Content class="">
                {#each images as image}
                <Carousel.Item class=" overflow-hidden transition-all">
                    {#if image.split(".")[image.split(".").length-1] === "webp" || image.split(".")[image.split(".").length-1] === "png"}
                        <img src="{image}" alt={image} class="object-scale-down rounded-sm w-full h-full"/>
                    {:else}
                        <video autoplay muted loop src="{image}" class="object-scale-down rounded-sm w-full h-full"/>
                    {/if}
                </Carousel.Item>
                {/each}
            </Carousel.Content>

            {#if images.length !== 1}
                <div class="{dialogOpened ? "flex" : "hidden"} gap-2 absolute left-1 -bottom-12">
                    <button class="p-1 px-2 flex items-center justify-center bg-white rounded-lg opacity-70 border border-b-2 border-slate-700 hover:opacity-100" on:click={(e) => {
                        api.scrollPrev();
                        e.stopPropagation();
                    }}>
                        <svg class="lucide lucide-chevron-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            
                    </button>
                    <button class="p-1 px-2 flex items-center justify-center bg-white rounded-lg opacity-70 border border-b-2 border-slate-700 hover:opacity-100" on:click={(e) => {
                        api.scrollNext();
                        e.stopPropagation();
                    }}>
                        <svg class="lucide lucide-chevron-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>
            {/if}
            
            <Dialog.Close class="absolute -top-12 right-1 flex items-center justify-center bg-white rounded-lg opacity-70 border border-b-2 border-slate-700 hover:opacity-100 px-2 py-1" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Dialog.Close>
        </Carousel.Root>

    </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>