<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";

    export let label:string = "tag";
    export let checked:boolean = false;
</script>

<div class="flex flex-row">
    <div class="flex items-center space-x-2">
        <Checkbox
        id={label + "-checkbox"}
        bind:checked
        aria-labelledby="terms-label"
        class="rounded-none"
    />
    <Label
        id="terms-label"
        for={label + "-checkbox"}
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        {label}
    </Label>
  </div>
</div>
