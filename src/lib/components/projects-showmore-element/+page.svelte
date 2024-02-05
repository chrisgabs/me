<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import gradientImage from '$lib/assets/project-images/gradient.jpg';

</script>

<li>
    <div class="group flex flex-col lg:max-w-xs justify-end items-center lg:min-h-[28rem]">
    <div class="group hidden relative bg-yellow center items-center justify-center w-72 lg:flex">
        <div class="absolute -left-1 -top-1 overflow-hidden border border-slate-700 w-72 h-12 transition-all origin-bottom group-hover:-rotate-2 group-hover:-translate-y-5 ">
            <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
        </div>
        <div class="absolute -left-2 top-1 overflow-hidden border border-slate-700 w-72 h-12 transition-all origin-bottom group-hover:-translate-y-3">
            <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
        </div>
        <div class="absolute left-1 top-3 overflow-hidden border border-slate-700 w-72 h-12 transition-all origin-bottom group-hover:rotate-2 group-hover:-translate-y-2">
            <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
        </div>
    </div>

    <Button variant="outline" href="/projects" class="flex flex-col z-50 rounded-sm gap-1 p-4 border-l border-t border-b-4 border-r-4 border-slate-700 lg:w-80 lg:h-52 lg:mt-6">
        Check Out My Other Projects!
        <span class="hidden lg:block font-normal">[12] Projects</span>
    </Button>
    <!-- <div class="z-50 rounded-none gap-1 p-4 border-l border-t border-b-4 border-r-4 border-slate-700 lg:w-80 lg:h-36 mt-1">
        View All of My Projects
    </div> -->

    
    </div>
</li>