<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    export let datePeriod:string = "date period";
    export let workTitle:string  = "work title";
    export let company:string  = "company";
    export let description:string  = "description";
    export let techBadges:string[] = [];
    export let lastElement:boolean = false;
    export let link:string = "/";

</script>

<li class="group sm:flex">
    <div class="hidden w-28 sm:inline-flex">
            <span class="overflow-auto font-semibold text-xs sm:w-28 sm:mt-2 sm:mr-4 sm:text-right">{datePeriod}</span>
    </div>
    <!-- <div class="absolute bg-slate-700 rounded-full left-[2.6rem] w-3.5 h-3.5 mt-0.5 sm:hidden"/> -->
    <div class="flex flex-col gap-3 border-l border-solid border-slate-700 pl-4 {lastElement ? "pb-5" : "pb-10"} transition-all">
        <div class="inline-flex whitespace-nowrap sm:hidden">
            <span class="overflow-auto font-semibold text-xs">{datePeriod}</span>
        </div>
        <div>
            <h3 class="mb-1 flex-wrap">
                <span class=" font-bold text-lg leading-normal sm:text-xl md:text-lg">{workTitle} -
                    {#if link !== ""}
                         <a href={link} class="inline-block after:inline-block underline-offset-4 link cursor-pointer hover:underline">
                             {company}</a>
                    {:else}
                         <span>
                             {company}</span>
                    {/if}
                </span>
            </h3>
            <p class="leading-relaxed mb-2 text-sm tracking-wide max-w-lg text-justify">{description}</p>
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