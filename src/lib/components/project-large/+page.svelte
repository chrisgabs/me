<script lang="ts">
    import gradientImage from '$lib/assets/project-images/gradient.jpg';
    import { Badge } from "$lib/components/ui/badge";
    
    export let techBadges:string[] = [];
</script>


<div class="relative w-full flex justify-end aspect-w-16 aspect-h-10 border border-b-4 border-r-4 border-slate-700">
    <!-- Image -->
    <img src="{gradientImage}" alt="asdasdasd" class="object-cover w-full h-full"/>

    <!-- Overlay Content -->
    <div class="group absolute inset-2 h-fit ml-auto mr-1 w-fit">
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

    <!-- Overlay Content -->
    <div class="group absolute inset-0 h-fit mt-auto right-1 p-4 bg-gray-50 bg-opacity-85 border border-t-1 border-b-0 border-x-0 border-slate-700">
        <h3 class="text-xl font-bold mb-2 duration-200">TicTacToe 2</h3>
        <ul class="flex gap-2 group-hover:mb-2">
            {#each techBadges as badge}
                    <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
            {/each}
        </ul>
        <p class="text-sm leading-relaxed tracking-wide h-0 bottom-0 overflow-hidden group-hover:h-full group-hover:min-h-10">Developed in Golang and deployed on AWS, offers a multiplayer experience for up to four players concurrently across multiple rooms. The real-time feature enables players to observe live moves as participants drag their pieces during gameplay, facilitated through WebSocket technology.</p>
    </div>
</div>

