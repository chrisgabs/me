<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import gradientImage from '$lib/assets/gradient.jpg';
</script>


<div class="border-slate-700 bg-slate-400">
    <div class="relative left-0 top-0 overflow-hidden border border-slate-700 w-64 h-12">
        <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
    </div>
    <div class="absolute left-1 top-3 overflow-hidden border border-slate-700 w-64 h-12">
        <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
    </div>
    <div class="absolute left-2 top-6 overflow-hidden border border-slate-700 w-64 h-12">
        <img src="{gradientImage}" alt="title" class="object-cover w-full h-full"/>
    </div>
</div>
