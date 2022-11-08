<script>import Svg from './../../ui/Svg/svelte';
export let title = '';
export let icon = '';
export let href = '';
export let active = false;</script>

<a class="btn column hv-center txt-m" {href} on:click class:active>
  <Svg id={icon} w="20" h="20" class="icon" />
  {title}
</a>

<style >a {
  gap: 10px;
  --fill: var(--fiord);
  --color: var(--waterloo);
}

.active {
  --fill: var(--green);
  --color: var(--green);
}</style>
