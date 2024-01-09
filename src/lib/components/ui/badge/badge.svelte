<script lang="ts">
	import { cn } from "$lib/utils";
	import { badgeVariants, type Variant } from ".";

	let className: string | undefined | null = undefined;
	let classCustom: string = "border-b-2 border-slate-700 bg-inherit";
	export let href: string | undefined = undefined;
	export let variant: Variant = "default";
	export { className as class };
</script>

<svelte:element
	this={href ? "a" : "span"}
	{href}
	class={cn(badgeVariants({ variant, className })) + " " + classCustom}
	{...$$restProps}
>
	<slot />
</svelte:element>
