<script lang="ts">
    import gradientImage from '$lib/assets/gradient.jpg';
    import { Badge } from "$lib/components/ui/badge";
    
    export let techBadges:string[] = [];
</script>

<!-- <ul class="flex gap-2 group-hover:mb-2">
    {#each techBadges as badge}
            <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
    {/each}
</ul> -->

<div class="w-full flex justify-end h-fit border border-r-4 border-slate-700">

    <!-- Overlay Content -->
    <div class="group inset-0 h-fit mt-auto right-1 p-4 bg-gray-50 bg-opacity-85">
        <h3 class="text-lg font-bold duration-200 group-hover:mb-2">TicTacToe 2</h3>

        <p class="text-sm leading-relaxed tracking-wide h-0 bottom-0 overflow-hidden group-hover:overflow-auto group-hover:h-full group-hover:min-h-10 transition-all duration-500">Developed in Golang and deployed on AWS, offers a multiplayer experience for up to four players concurrently across multiple rooms. The real-time feature enables players to observe live moves as participants drag their pieces during gameplay, facilitated through WebSocket technology.</p>
    </div>
</div>

