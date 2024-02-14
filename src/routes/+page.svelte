<svelte:head>
    <title>Christian Bayquen</title> 
</svelte:head>

<script lang="ts">
    // import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import * as Tabs from "$lib/components/ui/tabs";
    import WorkExperience from "$lib/components/work-experience-element/+page.svelte";
    import Experience from "$lib/components/generic-experience-element/+page.svelte";
    import Project from "$lib/components/project-element/+page.svelte";
    import ProjectViewMore from "$lib/components/projects-showmore-element/+page.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Separator } from "$lib/components/ui/separator";
    import { onMount } from "svelte";
    import featuredProjects from "$lib/content/main-page/projects-showcase/data.json"
    import workExperience from "$lib/content/main-page/work-experience/data.json";
    import academicExperience from "$lib/content/main-page/academic-experience/data.json";
    import freelanceExperience from "$lib/content/main-page/freelance-experience/data.json";
    
    let previouslySelectedElement:HTMLElement|null = null;
    let aboutSectionY:number|null = null;
    let workSectionY:number|null = null;
    let projectsSectionY:number|null = null;
    let writingSectionY:number|null = null;

    let copiedToClipboard:boolean = false;
    let clipboardMenuOpen:boolean = false;

    $: {
        if (!clipboardMenuOpen) {
            copiedToClipboard = false;
        }
    }

    onMount(async() => {
        aboutSectionY = document.getElementById("about")?.getBoundingClientRect().y!;
        workSectionY = document.getElementById("experience")?.getBoundingClientRect().y!;
        projectsSectionY = document.getElementById("projects")?.getBoundingClientRect().y!;
        writingSectionY = document.getElementById("writing")?.getBoundingClientRect().y!;

        document.addEventListener("scroll", () => {
            updateSelectedMenuItem();
        });

        window.addEventListener("resize", () => {
            updateSelectedMenuItem();
        })

        updateSelectedMenuItem();
    });

    function updateSelectedMenuItem() {
        aboutSectionY = document.getElementById("about")?.getBoundingClientRect().y!;
        workSectionY = document.getElementById("experience")?.getBoundingClientRect().y!;
        projectsSectionY = document.getElementById("projects")?.getBoundingClientRect().y!;
        writingSectionY = document.getElementById("writing")?.getBoundingClientRect().y!;

        const oneThirdsOfScreen:number = window.innerHeight/3;
        let currentlySelectedElement:HTMLElement|null = null;

        if (aboutSectionY < oneThirdsOfScreen) {
            currentlySelectedElement = document.getElementById("aboutMenuItem");
        }
        if (workSectionY < oneThirdsOfScreen) {
            currentlySelectedElement = document.getElementById("experienceMenuItem");
        }
        if (projectsSectionY < oneThirdsOfScreen) {
            currentlySelectedElement = document.getElementById("projectsMenuItem");
        }
        if (writingSectionY < window.innerHeight - (window.innerHeight*0.10)) {
            currentlySelectedElement = document.getElementById("writingMenuItem");
        }

        if (currentlySelectedElement !== null) {
            highlightSelectedSection(previouslySelectedElement, currentlySelectedElement);
            previouslySelectedElement = currentlySelectedElement;
        }
    }


    function scrollToSection(target:MouseEvent, section:string) {
        const elementCoords:DOMRect|undefined = document.getElementById(section)?.getBoundingClientRect();

        if (target.currentTarget instanceof HTMLButtonElement) {
            const childElement = target.currentTarget.children[0] as HTMLElement;
            highlightSelectedSection(previouslySelectedElement as HTMLElement, childElement);
            previouslySelectedElement = childElement;
        }

        if (elementCoords) {
            let offset:number = -96; // in pixels (margin top)

            window.scrollBy({
                top: elementCoords.y + offset,
                left: 0,
                behavior: "smooth",
            });
        }
    }

    function highlightSelectedSection(previouslySelected:HTMLElement|null, currentlySelected:HTMLElement) {
        if (previouslySelected !== null) {
            previouslySelected.classList.remove("w-4");
            previouslySelected.classList.add("w-px");
        }
        currentlySelected.classList.remove("w-px");
        currentlySelected.classList.add("w-4");
    }

    function copyTextToClipboard(text:string) {
        try {
            navigator.clipboard.writeText(text).then(() => {
                copiedToClipboard = true;
            });
            return true;
        } catch (error) {
            console.error('Error copying text to clipboard:', error);
            return false;
        }
    }

</script>

<!-- <div class="hidden xl:hidden sm:block md:sticky left-0 top-0 bg-slate-950 md:bg-yellow-500 md:bg-slate-500 lg:bg-yellow-300 xl:bg-slate-50 w-full h-[5px]"></div> -->

<div class="flex flex-col w-fit h-fit px-12 sm:max-w-2xl sm:mx-auto md:gap-4 md:flex-row md:max-w-full md:mx-0 lg:mx-auto lg:justify-between xl:px-20 lg:gap-8 xl:gap-12">

    <header class="flex h-dvh w-full items-center text-slate-900 md:sticky md:top-0 md:pt-24 md:pl-auto md:w-fit">
        <div class="flex flex-col justify-between min-h-content gap-20 md:pb-28 md:gap-0 md:h-full md:min-w-80">
            <div class="flex flex-col gap-20">
            <div id="heading">
                <div class="flex mb-2 gap-2">
                    <button on:click={() => {clipboardMenuOpen = true}}>
                        <Badge variant="secondary" class="flex gap-2 w-fit bg-inherit neo-badge">
                            <div class="relative inline-flex h-2 w-2 rounded-full bg-green-500"/> 
                            <span class="font-bold">Ready to Connect</span>
                        </Badge>
                    </button>
                    <div title="Philippines" class="flex gap-0.5 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span class="font-semibold">PH</span>
                    </div>
                </div>
                <!-- <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-4xl"><ruby>Christian <rp>(</rp><rt>sdfasdfklj</rt><rp>)</rp>Bayquen</ruby></h1> -->
                <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-4xl">Christian Bayquen</h1>
                <h2 class="mt-2 text-lg font-medium tracking-tight sm:text-xl">Applications Engineer at Oracle</h2>
                <p class="mt-8 max-w-xs leading-normal">I love automation, problem solving, and building meaningful applications with:</p>
                <ul class="flex mt-5 gap-4">
                    <li title="Golang">
                        <!-- go -->
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="37.5" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M400.1 194.8C389.2 197.6 380.2 199.1 371 202.4C363.7 204.3 356.3 206.3 347.8 208.5L347.2 208.6C343 209.8 342.6 209.9 338.7 205.4C334 200.1 330.6 196.7 324.1 193.5C304.4 183.9 285.4 186.7 267.7 198.2C246.5 211.9 235.6 232.2 235.9 257.4C236.2 282.4 253.3 302.9 277.1 306.3C299.1 309.1 316.9 301.7 330.9 285.8C333 283.2 334.9 280.5 337 277.5V277.5L337 277.5C337.8 276.5 338.5 275.4 339.3 274.2H279.2C272.7 274.2 271.1 270.2 273.3 264.9C277.3 255.2 284.8 239 289.2 230.9C290.1 229.1 292.3 225.1 296.1 225.1H397.2C401.7 211.7 409 198.2 418.8 185.4C441.5 155.5 468.1 139.9 506 133.4C537.8 127.8 567.7 130.9 594.9 149.3C619.5 166.1 634.7 188.9 638.8 218.8C644.1 260.9 631.9 295.1 602.1 324.4C582.4 345.3 557.2 358.4 528.2 364.3C522.6 365.3 517.1 365.8 511.7 366.3C508.8 366.5 506 366.8 503.2 367.1C474.9 366.5 449 358.4 427.2 339.7C411.9 326.4 401.3 310.1 396.1 291.2C392.4 298.5 388.1 305.6 382.1 312.3C360.5 341.9 331.2 360.3 294.2 365.2C263.6 369.3 235.3 363.4 210.3 344.7C187.3 327.2 174.2 304.2 170.8 275.5C166.7 241.5 176.7 210.1 197.2 184.2C219.4 155.2 248.7 136.8 284.5 130.3C313.8 124.1 341.8 128.4 367.1 145.6C383.6 156.5 395.4 171.4 403.2 189.5C405.1 192.3 403.8 193.9 400.1 194.8zM48.3 200.4C47.1 200.4 46.7 199.8 47.4 198.8L53.9 190.4C54.5 189.5 56.1 188.9 57.3 188.9H168.6C169.8 188.9 170.1 189.8 169.5 190.7L164.2 198.8C163.6 199.8 162 200.7 161.1 200.7L48.3 200.4zM1.2 229.1C0 229.1-.3 228.4 .3 227.5L6.9 219.1C7.5 218.2 9 217.5 10.3 217.5H152.4C153.6 217.5 154.2 218.5 153.9 219.4L151.4 226.9C151.1 228.1 149.9 228.8 148.6 228.8L1.2 229.1zM75.7 255.9C75.1 256.8 75.4 257.7 76.7 257.7L144.6 258C145.5 258 146.8 257.1 146.8 255.9L147.4 248.4C147.4 247.1 146.8 246.2 145.5 246.2H83.2C82 246.2 80.7 247.1 80.1 248.1L75.7 255.9zM577.2 237.9C577 235.3 576.9 233.1 576.5 230.9C570.9 200.1 542.5 182.6 512.9 189.5C483.9 196 465.2 214.4 458.4 243.7C452.8 268 464.6 292.6 487 302.6C504.2 310.1 521.3 309.2 537.8 300.7C562.4 287.1 575.8 268 577.4 241.2C577.3 240 577.3 238.9 577.2 237.9z"/></svg>
                    </li>
                    <li title="SvelteKit">
                        <!-- svelte -->
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24.94" height="30" viewBox="0 0 256 308" version="1.1" preserveAspectRatio="xMidYMid"><g><path d="M239.681566,40.706757 C211.113272,-0.181889366 154.69089,-12.301439 113.894816,13.6910393 L42.2469062,59.3555354 C22.6760042,71.6680028 9.1958152,91.6538543 5.11196889,114.412133 C1.69420521,133.371174 4.6982178,152.928576 13.6483951,169.987905 C7.51549676,179.291145 3.33259428,189.7413 1.3524912,200.706787 C-2.77083771,223.902098 2.62286977,247.780539 16.3159596,266.951444 C44.8902975,307.843936 101.312954,319.958266 142.10271,293.967161 L213.75062,248.302665 C233.322905,235.991626 246.803553,216.005094 250.885557,193.246067 C254.302867,174.287249 251.30121,154.730228 242.355449,137.668922 C248.486748,128.365895 252.667894,117.916162 254.646134,106.951413 C258.772188,83.7560394 253.378243,59.8765465 239.682665,40.706757" fill="#000000"/><path d="M106.888658,270.841265 C83.7871855,276.848065 59.3915045,267.805346 45.7864111,248.192566 C37.5477583,236.66102 34.3023491,222.296573 36.7830958,208.343155 C37.1989333,206.075414 37.7711933,203.839165 38.4957755,201.650433 L39.845476,197.534835 L43.5173097,200.231763 C51.9971301,206.462491 61.4784803,211.199728 71.5527203,214.239302 L74.2164003,215.047419 L73.9710252,217.705878 C73.6455499,221.487851 74.6696022,225.262925 76.8616703,228.361972 C80.9560313,234.269749 88.3011363,236.995968 95.2584831,235.190159 C96.8160691,234.773852 98.3006859,234.121384 99.6606718,233.25546 L171.331634,187.582718 C174.877468,185.349963 177.321139,181.729229 178.065299,177.605596 C178.808171,173.400048 177.830501,169.072361 175.351884,165.594581 C171.255076,159.685578 163.908134,156.9582 156.947927,158.762547 C155.392392,159.178888 153.90975,159.83088 152.551509,160.695872 L125.202489,178.130144 C120.705281,180.989558 115.797437,183.144784 110.64897,184.521162 C87.547692,190.527609 63.1523949,181.484801 49.5475471,161.872188 C41.3085624,150.340895 38.0631179,135.976391 40.5442317,122.023052 C43.0002744,108.333716 51.1099574,96.3125326 62.8835328,88.9089537 L134.548175,43.2323647 C139.047294,40.3682559 143.958644,38.21032 149.111311,36.8336525 C172.21244,30.8273594 196.607527,39.8700206 210.212459,59.4823515 C218.451112,71.013898 221.696522,85.3783452 219.215775,99.3317627 C218.798144,101.59911 218.225915,103.835236 217.503095,106.024485 L216.153395,110.140083 L212.483484,107.447276 C204.004261,101.212984 194.522,96.4735732 184.44615,93.4336926 L181.78247,92.6253012 L182.027845,89.9668419 C182.350522,86.1852063 181.326723,82.4111645 179.1372,79.3110228 C175.042839,73.4032457 167.697734,70.677026 160.740387,72.4828355 C159.182801,72.8991426 157.698185,73.5516104 156.338199,74.4175344 L84.6672364,120.0922 C81.1218886,122.323199 78.6795938,125.943704 77.9387928,130.066574 C77.1913232,134.271925 78.1673502,138.601163 80.6469865,142.078963 C84.7438467,147.987899 92.0907405,150.71526 99.0509435,148.910997 C100.608143,148.493836 102.092543,147.841423 103.452857,146.976298 L130.798305,129.548621 C135.293566,126.685437 140.201191,124.528302 145.350175,123.152382 C168.451453,117.145935 192.846751,126.188743 206.451598,145.801356 C214.690583,157.332649 217.936027,171.697153 215.454914,185.650492 C212.997261,199.340539 204.888162,211.362752 193.115613,218.769811 L121.450695,264.442553 C116.951576,267.306662 112.040226,269.464598 106.887559,270.841265" fill="#FFFFFF"/></g></svg>
                    </li>
                    <li title="Python">
                        <!-- python -->
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="28.13" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 .1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/></svg>
                    </li>
                    <li title="Javascript/Typescript">
                        <!-- js -->
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="26.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>
                    </li>
                    <li title="Java">
                        <!-- java -->
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="22.5" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M277.7 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.8 0 242.8 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.2 12.2 0 0 1 -2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.3 17.3 0 0 0 -8.2 6.3 70.5 70.5 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6 .7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.8 509.4 401 461.3 348 437.4zM124.4 396c-78.7 22 47.9 67.4 148.1 24.5a185.9 185.9 0 0 1 -28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.6 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.4 60.4 0 0 1 -21.1-12.8z"/></svg>
                    </li>
                    <li title="PostgreSQL">
                        <!-- pgsql -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-4 0 264 264" preserveAspectRatio="xMinYMin meet" fill="#000000">
                            <g id="SVGRepo_iconCarrier">
                            <path d="M255.008 158.086c-1.535-4.649-5.556-7.887-10.756-8.664-2.452-.366-5.26-.21-8.583.475-5.792 1.195-10.089 1.65-13.225 1.738 11.837-19.985 21.462-42.775 27.003-64.228 8.96-34.689 4.172-50.492-1.423-57.64C233.217 10.847 211.614.683 185.552.372c-13.903-.17-26.108 2.575-32.475 4.549-5.928-1.046-12.302-1.63-18.99-1.738-12.537-.2-23.614 2.533-33.079 8.15-5.24-1.772-13.65-4.27-23.362-5.864-22.842-3.75-41.252-.828-54.718 8.685C6.622 25.672-.937 45.684.461 73.634c.444 8.874 5.408 35.874 13.224 61.48 4.492 14.718 9.282 26.94 14.237 36.33 7.027 13.315 14.546 21.156 22.987 23.972 4.731 1.576 13.327 2.68 22.368-4.85 1.146 1.388 2.675 2.767 4.704 4.048 2.577 1.625 5.728 2.953 8.875 3.74 11.341 2.835 21.964 2.126 31.027-1.848.056 1.612.099 3.152.135 4.482.06 2.157.12 4.272.199 6.25.537 13.374 1.447 23.773 4.143 31.049.148.4.347 1.01.557 1.657 1.345 4.118 3.594 11.012 9.316 16.411 5.925 5.593 13.092 7.308 19.656 7.308 3.292 0 6.433-.432 9.188-1.022 9.82-2.105 20.973-5.311 29.041-16.799 7.628-10.86 11.336-27.217 12.007-52.99.087-.729.167-1.425.244-2.088l.16-1.362 1.797.158.463.031c10.002.456 22.232-1.665 29.743-5.154 5.935-2.754 24.954-12.795 20.476-26.351"/>
                            <path d="M237.906 160.722c-29.74 6.135-31.785-3.934-31.785-3.934 31.4-46.593 44.527-105.736 33.2-120.211-30.904-39.485-84.399-20.811-85.292-20.327l-.287.052c-5.876-1.22-12.451-1.946-19.842-2.067-13.456-.22-23.664 3.528-31.41 9.402 0 0-95.43-39.314-90.991 49.444.944 18.882 27.064 142.873 58.218 105.422 11.387-13.695 22.39-25.274 22.39-25.274 5.464 3.63 12.006 5.482 18.864 4.817l.533-.452c-.166 1.7-.09 3.363.213 5.332-8.026 8.967-5.667 10.541-21.711 13.844-16.235 3.346-6.698 9.302-.471 10.86 7.549 1.887 25.013 4.561 36.813-11.958l-.47 1.885c3.144 2.519 5.352 16.383 4.982 28.952-.37 12.568-.617 21.197 1.86 27.937 2.479 6.74 4.948 21.905 26.04 17.386 17.623-3.777 26.756-13.564 28.027-29.89.901-11.606 2.942-9.89 3.07-20.267l1.637-4.912c1.887-15.733.3-20.809 11.157-18.448l2.64.232c7.99.363 18.45-1.286 24.589-4.139 13.218-6.134 21.058-16.377 8.024-13.686h.002" fill="#000000"/>
                            <path d="M108.076 81.525c-2.68-.373-5.107-.028-6.335.902-.69.523-.904 1.129-.962 1.546-.154 1.105.62 2.327 1.096 2.957 1.346 1.784 3.312 3.01 5.258 3.28.282.04.563.058.842.058 3.245 0 6.196-2.527 6.456-4.392.325-2.336-3.066-3.893-6.355-4.35M196.86 81.599c-.256-1.831-3.514-2.353-6.606-1.923-3.088.43-6.082 1.824-5.832 3.659.2 1.427 2.777 3.863 5.827 3.863.258 0 .518-.017.78-.054 2.036-.282 3.53-1.575 4.24-2.32 1.08-1.136 1.706-2.402 1.591-3.225" fill="#FFF"/>
                            <path d="M247.802 160.025c-1.134-3.429-4.784-4.532-10.848-3.28-18.005 3.716-24.453 1.142-26.57-.417 13.995-21.32 25.508-47.092 31.719-71.137 2.942-11.39 4.567-21.968 4.7-30.59.147-9.463-1.465-16.417-4.789-20.665-13.402-17.125-33.072-26.311-56.882-26.563-16.369-.184-30.199 4.005-32.88 5.183-5.646-1.404-11.801-2.266-18.502-2.376-12.288-.199-22.91 2.743-31.704 8.74-3.82-1.422-13.692-4.811-25.765-6.756-20.872-3.36-37.458-.814-49.294 7.571-14.123 10.006-20.643 27.892-19.38 53.16.425 8.501 5.269 34.653 12.913 59.698 10.062 32.964 21 51.625 32.508 55.464 1.347.449 2.9.763 4.613.763 4.198 0 9.345-1.892 14.7-8.33a529.832 529.832 0 0 1 20.261-22.926c4.524 2.428 9.494 3.784 14.577 3.92.01.133.023.266.035.398a117.66 117.66 0 0 0-2.57 3.175c-3.522 4.471-4.255 5.402-15.592 7.736-3.225.666-11.79 2.431-11.916 8.435-.136 6.56 10.125 9.315 11.294 9.607 4.074 1.02 7.999 1.523 11.742 1.523 9.103 0 17.114-2.992 23.516-8.781-.197 23.386.778 46.43 3.586 53.451 2.3 5.748 7.918 19.795 25.664 19.794 2.604 0 5.47-.303 8.623-.979 18.521-3.97 26.564-12.156 29.675-30.203 1.665-9.645 4.522-32.676 5.866-45.03 2.836.885 6.487 1.29 10.434 1.289 8.232 0 17.731-1.749 23.688-4.514 6.692-3.108 18.768-10.734 16.578-17.36zm-44.106-83.48c-.061 3.647-.563 6.958-1.095 10.414-.573 3.717-1.165 7.56-1.314 12.225-.147 4.54.42 9.26.968 13.825 1.108 9.22 2.245 18.712-2.156 28.078a36.508 36.508 0 0 1-1.95-4.009c-.547-1.326-1.735-3.456-3.38-6.404-6.399-11.476-21.384-38.35-13.713-49.316 2.285-3.264 8.084-6.62 22.64-4.813zm-17.644-61.787c21.334.471 38.21 8.452 50.158 23.72 9.164 11.711-.927 64.998-30.14 110.969a171.33 171.33 0 0 0-.886-1.117l-.37-.462c7.549-12.467 6.073-24.802 4.759-35.738-.54-4.488-1.05-8.727-.92-12.709.134-4.22.692-7.84 1.232-11.34.663-4.313 1.338-8.776 1.152-14.037.139-.552.195-1.204.122-1.978-.475-5.045-6.235-20.144-17.975-33.81-6.422-7.475-15.787-15.84-28.574-21.482 5.5-1.14 13.021-2.203 21.442-2.016zM66.674 175.778c-5.9 7.094-9.974 5.734-11.314 5.288-8.73-2.912-18.86-21.364-27.791-50.624-7.728-25.318-12.244-50.777-12.602-57.916-1.128-22.578 4.345-38.313 16.268-46.769 19.404-13.76 51.306-5.524 64.125-1.347-.184.182-.376.352-.558.537-21.036 21.244-20.537 57.54-20.485 59.759-.002.856.07 2.068.168 3.735.362 6.105 1.036 17.467-.764 30.334-1.672 11.957 2.014 23.66 10.111 32.109a36.275 36.275 0 0 0 2.617 2.468c-3.604 3.86-11.437 12.396-19.775 22.426zm22.479-29.993c-6.526-6.81-9.49-16.282-8.133-25.99 1.9-13.592 1.199-25.43.822-31.79-.053-.89-.1-1.67-.127-2.285 3.073-2.725 17.314-10.355 27.47-8.028 4.634 1.061 7.458 4.217 8.632 9.645 6.076 28.103.804 39.816-3.432 49.229-.873 1.939-1.698 3.772-2.402 5.668l-.546 1.466c-1.382 3.706-2.668 7.152-3.465 10.424-6.938-.02-13.687-2.984-18.819-8.34zm1.065 37.9c-2.026-.506-3.848-1.385-4.917-2.114.893-.42 2.482-.992 5.238-1.56 13.337-2.745 15.397-4.683 19.895-10.394 1.031-1.31 2.2-2.794 3.819-4.602l.002-.002c2.411-2.7 3.514-2.242 5.514-1.412 1.621.67 3.2 2.702 3.84 4.938.303 1.056.643 3.06-.47 4.62-9.396 13.156-23.088 12.987-32.921 10.526zm69.799 64.952c-16.316 3.496-22.093-4.829-25.9-14.346-2.457-6.144-3.665-33.85-2.808-64.447.011-.407-.047-.8-.159-1.17a15.444 15.444 0 0 0-.456-2.162c-1.274-4.452-4.379-8.176-8.104-9.72-1.48-.613-4.196-1.738-7.46-.903.696-2.868 1.903-6.107 3.212-9.614l.549-1.475c.618-1.663 1.394-3.386 2.214-5.21 4.433-9.848 10.504-23.337 3.915-53.81-2.468-11.414-10.71-16.988-23.204-15.693-7.49.775-14.343 3.797-17.761 5.53-.735.372-1.407.732-2.035 1.082.954-11.5 4.558-32.992 18.04-46.59 8.489-8.56 19.794-12.788 33.568-12.56 27.14.444 44.544 14.372 54.366 25.979 8.464 10.001 13.047 20.076 14.876 25.51-13.755-1.399-23.11 1.316-27.852 8.096-10.317 14.748 5.644 43.372 13.315 57.129 1.407 2.521 2.621 4.7 3.003 5.626 2.498 6.054 5.732 10.096 8.093 13.046.724.904 1.426 1.781 1.96 2.547-4.166 1.201-11.649 3.976-10.967 17.847-.55 6.96-4.461 39.546-6.448 51.059-2.623 15.21-8.22 20.875-23.957 24.25zm68.104-77.936c-4.26 1.977-11.389 3.46-18.161 3.779-7.48.35-11.288-.838-12.184-1.569-.42-8.644 2.797-9.547 6.202-10.503.535-.15 1.057-.297 1.561-.473.313.255.656.508 1.032.756 6.012 3.968 16.735 4.396 31.874 1.271l.166-.033c-2.042 1.909-5.536 4.471-10.49 6.772z" fill="#FFF"/>
                            </g>
                        </svg>
                    </li>
                </ul>
            </div>
    
            <ul class="flex flex-col gap-2 mb-14">
                <li class="group">
                    <button class="delay-150 w-40 flex flex-row gap-2 items-center" on:click={(e)=> scrollToSection(e, "about")}>
                        <div id="aboutMenuItem" class="h-4 w-px bg-slate-800 rounded-sm transition-all group-hover:w-3"/><p class="">About</p>
                    </button>
                </li>
                <li class="group">
                    <button class="delay-150 w-40 flex flex-row gap-2 items-center" on:click={(e)=> scrollToSection(e, "experience")}>
                        <div id="experienceMenuItem" class="h-4 w-px bg-slate-800 rounded-sm transition-all group-hover:w-3"/><p class="">Work</p>
                    </button>
                </li>
                <li class="group">
                    <button class="delay-150 w-40 flex flex-row gap-2 items-center" on:click={(e)=> scrollToSection(e, "projects")}>
                        <div id="projectsMenuItem" class="h-4 w-px bg-slate-800 rounded-sm transition-all group-hover:w-3"/><p class="">Projects</p>
                    </button>
                </li>
                <li class="group">
                    <button class="delay-150 w-40 flex flex-row gap-2 items-center" on:click={(e)=> scrollToSection(e, "writing")}>
                        <div id="writingMenuItem" class="h-4 w-px bg-slate-800 rounded-sm transition-all group-hover:w-3"/><p class="">Writing</p>
                    </button>
                </li>
            </ul>
            </div>
    
            <div>
                <ul class="flex items-center mt-4 gap-5">
                    <li>
                        <a href="https://github.com/chrisgabs" target="_blank" class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="18" width="15.75" viewBox="0 0 448 512">!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.<path d="M448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM265.8 407.7c0-1.8 0-6 .1-11.6c.1-11.4 .1-28.8 .1-43.7c0-15.6-5.2-25.5-11.3-30.7c37-4.1 76-9.2 76-73.1c0-18.2-6.5-27.3-17.1-39c1.7-4.3 7.4-22-1.7-45c-13.9-4.3-45.7 17.9-45.7 17.9c-13.2-3.7-27.5-5.6-41.6-5.6s-28.4 1.9-41.6 5.6c0 0-31.8-22.2-45.7-17.9c-9.1 22.9-3.5 40.6-1.7 45c-10.6 11.7-15.6 20.8-15.6 39c0 63.6 37.3 69 74.3 73.1c-4.8 4.3-9.1 11.7-10.6 22.3c-9.5 4.3-33.8 11.7-48.3-13.9c-9.1-15.8-25.5-17.1-25.5-17.1c-16.2-.2-1.1 10.2-1.1 10.2c10.8 5 18.4 24.2 18.4 24.2c9.7 29.7 56.1 19.7 56.1 19.7c0 9 .1 21.7 .1 30.6c0 4.8 .1 8.6 .1 10c0 4.3-3 9.5-11.5 8C106 393.6 59.8 330.8 59.8 257.4c0-91.8 70.2-161.5 162-161.5s166.2 69.7 166.2 161.5c.1 73.4-44.7 136.3-110.7 158.3c-8.4 1.5-11.5-3.7-11.5-8zm-90.5-54.8c-.2-1.5 1.1-2.8 3-3.2c1.9-.2 3.7 .6 3.9 1.9c.3 1.3-1 2.6-3 3c-1.9 .4-3.7-.4-3.9-1.7zm-9.1 3.2c-2.2 .2-3.7-.9-3.7-2.4c0-1.3 1.5-2.4 3.5-2.4c1.9-.2 3.7 .9 3.7 2.4c0 1.3-1.5 2.4-3.5 2.4zm-14.3-2.2c-1.9-.4-3.2-1.9-2.8-3.2s2.4-1.9 4.1-1.5c2 .6 3.3 2.1 2.8 3.4c-.4 1.3-2.4 1.9-4.1 1.3zm-12.5-7.3c-1.5-1.3-1.9-3.2-.9-4.1c.9-1.1 2.8-.9 4.3 .6c1.3 1.3 1.8 3.3 .9 4.1c-.9 1.1-2.8 .9-4.3-.6zm-8.5-10c-1.1-1.5-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3c1.1 1.5 1.1 3.3 0 4.1c-.9 .6-2.6 0-3.7-1.5zm-6.3-8.8c-1.1-1.3-1.3-2.8-.4-3.5c.9-.9 2.4-.4 3.5 .6c1.1 1.3 1.3 2.8 .4 3.5c-.9 .9-2.4 .4-3.5-.6zm-6-6.4c-1.3-.6-1.9-1.7-1.5-2.6c.4-.6 1.5-.9 2.8-.4c1.3 .7 1.9 1.8 1.5 2.6c-.4 .9-1.7 1.1-2.8 .4z"/></svg> -->
                            <span>Github</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/christian-bayquen/" class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" height="18" width="15.75" viewBox="0 0 448 512">!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.<path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg> -->
                            <span>LinkedIn</span>
                        </a>
                    </li>
                    <li>
                        <!-- <a href="https://www.github.com" class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span>Email</span>
                        </a> -->
                        <DropdownMenu.Root bind:open={clipboardMenuOpen} preventScroll={false} closeOnItemClick={false}>
                        <DropdownMenu.Trigger id="email-trigger" class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span>Email</span>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content side="top" sideOffset={10} class="flex flex-col gap-1 shadow-none border-slate-500 rounded-sm">
                            <DropdownMenu.Label><span id="email">cbayquen.dev@gmail.com</span></DropdownMenu.Label>
                            <Separator class="bg-slate-500"></Separator>
                            <DropdownMenu.Item>
                                <a href="mailto:cbayquen.dev@gmail.com?subject=Let's Connect!" class="flex gap-2 items-center w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-plus"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M19 16v6"/><path d="M16 19h6"/></svg>
                                    Open in email app
                                </a>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button on:click={() => copyTextToClipboard("cbayquen.dev@gmail.com")} class="flex gap-2 items-center w-full {copiedToClipboard ? "text-green-700" : ""}">
                                    {#if copiedToClipboard}
                                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg> -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                                        Copied to cliboard
                                    {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-copy"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M21 14H11"/><path d="m15 10-4 4 4 4"/></svg>
                                        Copy to clipboard
                                    {/if}
                                </button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <!-- Content -->
    <div id="content" class="flex flex-col w-full md:pt-24 md:mx-0 md:min lg:max-w-[42rem]">

    <section id="about" class="flex flex-col mb-16">
        <div class="mb-7 w-full">
            <h2 class="font-bold text-2xl">About Me</h2>
        </div>
        <div class="block">
            <figure title="hello :D" class="float-right mb-1 ml-5 mt-1 lg:ml-6 ">
                <img src="/about/me.webp" alt={"me"} class="rounded-sm border border-slate-700 h-40 w-40 grayscale-[30%] hover:grayscale-[10%] transition-all duration-300"/>
            </figure>
            <p class="mb-4 text-justify">Greetings! I'm Christian, passionate about tackling challenges, automating processes, and building fun and meaningful applications. I am currently situated in the Philippines, where I find myself developing and maintaining enterprise applications for one of the globe's largest corporations.</p>
            <p class="mb-4 text-justify">Since printing out my first Hello World in the command line five years ago, I have been avidly learning and thriving to stay at the forefront of technology. As I've written code to solve problems that my friends and clients have been facing, I realized that my journey in tech is not just a profession but a passion that fuels my curiosity and creativity. Programming isn't just a skill; it's a means of creating amazing things! </p>
            <p class="mb-4 text-justify">I invite you to connect with me for exciting opportunities to collaborate and create impactful software together.</p>
        </div>
    </section>

    <section id="experience" class="flex flex-col mb-16">
        <div class="mb-7 w-full">
            <h2 class="font-bold text-2xl">Professional Background</h2>
        </div>
        
        <Tabs.Root value="work" class="min-w-auto">
        <Tabs.List class="text-muted-foreground justify-start rounded-none bg-transparent p-0">
            <Tabs.Trigger value="work" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Work</Tabs.Trigger>
            <Tabs.Trigger value="school" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Academic</Tabs.Trigger>
            <Tabs.Trigger value="freelance" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">Freelance</Tabs.Trigger>
        </Tabs.List>
            <Tabs.Content value="work">
            <!-- <div class="mt-3 rounded-sm border shadow-sm p-4"> -->
            <div class="mt-5">
                <ol class="flex flex-col">
                    {#each workExperience as experience}
                         <WorkExperience 
                             datePeriod={experience["date"]}
                             title={experience["title"]}
                             company={experience["company"]}
                             companyWebsite={experience["companyWebsite"]}
                             description={experience["description"]}
                             tags={experience["tags"]}
                         />
                    {/each}
                </ol>
            </div>
            </Tabs.Content>
            <Tabs.Content value="school">
            <div class="flex flex-col gap-4 mt-5">
                <div class="border-l border-slate-600 pl-4 sm:flex sm:flex-row sm:border-none sm:pl-0">
                    <div class="inline-flex whitespace-nowrap mb-2 sm:w-28 sm:whitespace-normal sm:text-right sm:pr-4 sm:mt-2">
                        <span class="overflow-auto text-xs font-semibold sm:w-28">Academic Achievements</span>
                    </div>
                    <ol class="flex flex-col gap-4 sm:border-l sm:border-slate-600 sm:pl-4">
                        {#each academicExperience["academicAchievements"] as achievement}
                            <Experience
                                title={achievement["title"]}
                                descriptions={achievement["descriptions"]}
                            />
                        {/each}
                    </ol>
                </div>
                <div class="border-l border-slate-600 pl-4 sm:flex sm:flex-row sm:border-none sm:pl-0">
                    <div class="inline-flex whitespace-nowrap mb-2 sm:w-28 sm:whitespace-normal sm:text-right sm:pr-4 sm:mt-2">
                        <span class="overflow-auto text-xs font-semibold sm:w-28">Research Work</span>
                    </div>
                    <ol class="flex flex-col gap-4 sm:border-l sm:border-slate-600 sm:pl-4">
                        {#each academicExperience["researchWork"] as research}
                            <Experience
                                title={research["title"]}
                                descriptions={research["descriptions"]}
                            />
                        {/each}
                    </ol>
                </div>
            </div>
            </Tabs.Content>
            <Tabs.Content value="freelance">
            <div class="flex flex-col gap-4 mt-5">
                <div class="border-l border-slate-600 pl-4 sm:flex sm:flex-row sm:border-none sm:pl-0">
                    <div class="inline-flex whitespace-nowrap mb-2 sm:w-28 sm:whitespace-normal sm:text-right sm:pr-4 sm:mt-2">
                        <span class="overflow-auto text-xs font-semibold sm:w-28">2023 - Present</span>
                    </div>
                    <ol class="flex flex-col gap-4 sm:border-l sm:border-slate-600 sm:pl-4">
                        {#each freelanceExperience as freelance}
                            <Experience
                                title={freelance["title"]}
                                descriptions={freelance["descriptions"]}
                            />
                        {/each}
                    </ol>
                </div>
            </div>
            </Tabs.Content>
        </Tabs.Root>

    </section>
    
    <section id="projects" class="flex flex-col mb-16">
        <div class="mb-7 w-full">
            <h2 class="font-bold text-2xl">Featured Projects</h2>
        </div>
        <div>
            <!-- <ol class="section-with-scrollbar flex flex-col gap-6 lg:flex-row lg:overflow-hidden lg:snap-x lg:pb-2 lg:hover:overflow-x-auto"> -->
            <ol class="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start">
                {#each featuredProjects as project}
                    <Project
                        title={project["title"]} 
                        images={project["images"]} 
                        description={project["description"]} 
                        tags={project["tags"]} 
                        githubLink={project["githubLink"]} 
                        liveLink={project["liveLink"]}
                    />
                     <!-- content here -->
                {/each}
                <ProjectViewMore/>
            </ol>
        </div>
    </section>

    <section id="writing" class="flex flex-col mb-16">
        <div class="mb-7 w-full">
            <h2 class="font-bold text-2xl">Writing</h2>
        </div>
        <span>Coming soon, my two cents on all things!</span>
    </section>
    </div>

</div>