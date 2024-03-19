<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import gradientImage from '$lib/assets/project-images/gradient.jpg';

</script>

<li>
    <div class="group flex flex-col lg:max-w-xs justify-end items-center lg:min-h-[29rem]">
    <div class="group hidden relative bg-yellow center items-center justify-center w-72 lg:flex">
        <div class="absolute -left-1 -top-1 overflow-hidden border-2 border-slate-700 w-72 h-24 grayscale-[50%] group-hover:grayscale-0 transition-all duration-300 origin-bottom group-hover:-rotate-2 group-hover:-translate-y-16 ">
            <img src="/project-images/corba/1.webp" alt="title" class="object-cover w-full h-full"/>
        </div>
        <div class="absolute -left-2 top-1 overflow-hidden border-2 border-slate-700 w-72 h-24 grayscale-[50%] group-hover:grayscale-0 transition-all duration-300 origin-bottom group-hover:-translate-y-10">
            <img src="/project-images/volunteer/1.webp" alt="title" class="object-cover w-full h-full"/>
        </div>
        <div class="absolute left-1 top-3 overflow-hidden border-2 border-slate-700 w-72 h-12 grayscale-[50%] group-hover:grayscale-0 transition-all duration-300 origin-bottom group-hover:rotate-2 group-hover:-translate-y-5">
            <img src="/project-images/vac-dashboard/1.webp" alt="title" class="object-cover w-full h-full"/>
        </div>
    </div>

    <Button variant="outline" href="/projects" class="flex flex-col z-50 rounded-sm gap-1 p-4 border-l border-t border-b-4 border-r-4 border-slate-700 lg:w-80 lg:h-52 lg:mt-6">
        Check Out My Other Projects!
        <span class="hidden lg:block font-normal">[13] Projects</span>
    </Button>
    <!-- <div class="z-50 rounded-none gap-1 p-4 border-l border-t border-b-4 border-r-4 border-slate-700 lg:w-80 lg:h-36 mt-1">
        View All of My Projects
    </div> -->

    
    </div>
</li>