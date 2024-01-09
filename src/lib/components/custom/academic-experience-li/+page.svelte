<script lang="ts">
    export let title:string = "title";
    export let descriptions:string[] = [];
</script>

<li>
    <div class="flex flex-col gap-3">
        <div>
            <h3 class="mb-2">
                <span class="inline-flex items-center gap-1 font-bold text-lg leading-normal">
                    {title}
                </span>
            </h3>
            <ul class="flex flex-col gap-1">
                {#each descriptions as description}
                     <li>
                         <div class="flex gap-5">
                             <div class="relative inline-flex h-0.5 w-2 bg-black flex-shrink-0 mt-2"></div>
                             <p class="leading-relaxed text-sm tracking-wide">{description}</p>
                         </div>
                     </li>
                {/each}
            </ul>
        </div>
    </div>
</li>