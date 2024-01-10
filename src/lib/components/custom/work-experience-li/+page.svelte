<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    export let datePeriod:string = "date period";
    export let workTitle:string  = "work title";
    export let company:string  = "company";
    export let description:string  = "description";
    export let techBadges:string[] = [];
    export let lastElement:boolean = false;
</script>

<li class="group sm:flex">
    <div class="hidden w-28 sm:inline-flex">
            <span class="overflow-auto font-semibold text-xs sm:w-28 sm:mt-2 sm:mr-4 sm:text-right">{datePeriod}</span>
    </div>
    <!-- <div class="absolute bg-slate-700 rounded-full left-[2.6rem] w-3.5 h-3.5 mt-0.5 sm:hidden"/> -->
    <div class="flex flex-col gap-3 border-l border-solid border-slate-700 pl-4 {lastElement ? "pb-5" : "pb-10"} transition-all">
        <div class="inline-flex whitespace-nowrap w-80 sm:hidden">
            <span class="overflow-auto font-semibold text-xs">{datePeriod}</span>
        </div>
        <div>
            <h3 class="mb-1">
                <span class="font-bold text-lg leading-normal sm:text-xl">{workTitle} -
                    <span class="inline-flex items-center gap-1">
                        {company}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    </span>
                </span>
            </h3>
            <p class="leading-relaxed mb-2 text-sm tracking-wide max-w-sm">{description}</p>
            <ul class="flex gap-2">
                {#if techBadges !== null}
                    {#each techBadges as badge}
                        <li><Badge variant="secondary" class="neo-badge">{badge}</Badge></li>
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
</li>