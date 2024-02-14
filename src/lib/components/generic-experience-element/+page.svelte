<script lang="ts">
    export let title:string = "title";
    export let descriptions:string[] = [];
    export let link:string = "";
</script>

<li>
    <div class="flex flex-col gap-3">
        <div>
            <h3 class="mb-2 font-bold text-lg leading-normal sm:text-xl max-w-md md:text-lg">
                {#if link !== ""}
                    <a href={link} target="_blank" class="inline-block after:inline-block after:-mr-4 underline-offset-4 link cursor-pointer hover:underline">
                        {title}
                    </a>
                {:else}
                    <span>
                        {title}
                    </span>
                {/if}
            </h3>
            <ul class="flex flex-col gap-1">
                {#each descriptions as description}
                     <li>
                         <div class="flex gap-5">
                             <div class="relative inline-flex h-0.5 w-2 bg-black flex-shrink-0 mt-2"></div>
                             <p class="leading-relaxed text-sm tracking-wide max-w-lg">{description}</p>
                         </div>
                     </li>
                {/each}
            </ul>
        </div>
    </div>
</li>