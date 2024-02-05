<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ProjectSmall from '$lib/components/project-small/+page.svelte';
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { Separator } from "$lib/components/ui/separator";
    import { onMount } from "svelte";
    import projectsArchive from "$lib/content/projects-archive/data.json";
    import FilterOption from "$lib/components/utility/checkbox.svelte";

    let expanded:boolean = false;
    let filtersPermanentlyOpen:boolean = false;
    let filterIsOpen:boolean = false;

    let filters:{[key: string]: boolean} = {};

    $: {
        let enabledTags:string[] = [];

        for (const key in filters) {
            if (filters[key]) {
                enabledTags.push(key);
            }
        }

        if (enabledTags.length > 0) {
            projectsArchive["data"].forEach((project) => {
                project["visible"] = false;
                enabledTags.forEach((tag) => {
                    if (project["tags"].includes(tag)) {
                        project["visible"] = true;
                    }
                })
            })
        }else {
            projectsArchive["data"].forEach((project) => {
                project["visible"] = true;
            })
        }

        projectsArchive["data"] = projectsArchive["data"];
    }

    onMount(() => {
        projectsArchive["constants"]["languages"].forEach((lang) => {
            filters[lang] = false;
        })
        projectsArchive["constants"]["tags"].forEach((lang) => {
            filters[lang] = false;
        })
        
        updateFilterState();
        window.addEventListener("resize", ()=> {
            updateFilterState();
        })

        document.getElementById("controls")?.addEventListener("click", (e) => {
            filtersPermanentlyOpen = false;
        })
    })

    function updateFilterState() {
        const screenWidth:number = window.innerWidth;
        if (screenWidth >= 768) {
            filtersPermanentlyOpen = true;
            filterIsOpen = true;
        }else {
            filtersPermanentlyOpen = false;
            filterIsOpen = false;
        }
    }
</script>

<div class="xl:hidden sm:block md:sticky left-0 top-0 bg-slate-950 sm:bg-slate-500 md:bg-yellow-500 lg:bg-yellow-300 xl:bg-slate-50 w-full h-[5px]"></div>

<div class="flex flex-col w-full h-full px-12 sm:max-w-2xl sm:mx-auto md:min-w-fit md:mx-auto lg:mx-auto lg:justify-between xl:px-20">

    <!-- <button class="sticky top-4 left-0 w-10 h-10 rounded-lg bg-slate-300">

    </button> -->

    <header class="pt-24 mb-16">
        <h1 class="text-4xl font-bold tracking-tight">Projects Archive</h1>
        <!-- <h2 class="mt-2 text-lg font-medium tracking-tight sm:text-xl">Applications Engineer at Oracle</h2> -->
        <p class="mt-3 max-w-xs leading-normal">Here are some of the projects I've been working on since I've learned how to code.</p>
    </header>

    <div class="flex flex-col gap-6 md:flex-row md:min-w-fit">
        <Collapsible.Root bind:open={filterIsOpen} bind:disabled={filtersPermanentlyOpen} id="filters" class="flex flex-col w-full gap-4 md:w-fit md:gap-0">
            <div id="controls" class="flex justify-between md:flex-col">
                <Collapsible.Trigger class="inline-flex items-center w-fit justify-center text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-none border-l border-t border-b-4 border-r-4 border-slate-700 md:hover:bg-inherit md:border-none md:p-0 md:text-2xl md:font-bold">
                    Filters
                </Collapsible.Trigger>
                <Button variant="outline" class="md:hidden rounded-none border-l border-t border-b-4 border-r-4 border-slate-700"
                    on:click={() => expanded = !expanded}
                >
                    {#if expanded} Collapse All Projects {:else} Expand All Projects {/if}
                </Button>
            </div>
    
            <Collapsible.Content class="flex flex-col gap-4 px-1 md:pt-2 md:max-w-48">
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold text-sm">Languages</h3>
                    <div class="flex gap-4 flex-wrap">
                        {#each projectsArchive["constants"]["languages"] as language (language)}
                            <FilterOption bind:checked={filters[language]} label={language}/>
                        {/each}
                    </div>
                </div>
    
                <div class="flex flex-col gap-2">
                    <h3 class="font-bold text-sm">Tags</h3>
                    <div class="flex gap-4 flex-wrap">
                        {#each projectsArchive["constants"]["tags"] as tag (tag)}
                            <FilterOption bind:checked={filters[tag]} label={tag}/>
                        {/each}
                    </div>
                </div>
            </Collapsible.Content>

            <Separator class="hidden md:flex my-6"/>

            <Button variant="outline" class="hidden md:flex w-fit rounded-none border-l border-t border-b-4 border-r-4 border-slate-700"
                    on:click={() => expanded = !expanded}
            >
                {#if expanded} Collapse All Projects {:else} Expand All Projects {/if}
            </Button>
        </Collapsible.Root>
    

        <Separator orientation="horizontal" class="md:hidden"/>
        <Separator orientation="vertical" class="hidden md:flex h-96"/>
    
        <content class="flex grow flex-col gap-6 pb-12 w-full md:w-[32rem] lg:w-[36rem] transition-all">
    
            <!-- TODO: Turn this into an accordion -->
            {#each projectsArchive["data"] as project (project["title"])}
                {#if project["visible"]}
                    <ProjectSmall 
                        bind:allCollapsibleOpen={expanded} 
                        title={project["title"]} 
                        shortDescription={project["shortDescription"]}
                        longDescription={project["longDescription"]}
                        image={project["image"]}
                        tags={project["tags"]}
                    />
                {/if}
            {/each}

        </content>
    </div>


</div>