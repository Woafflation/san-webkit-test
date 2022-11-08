<script>import Svg from './../../ui/Svg/svelte';
export let isAscending = false;</script>

<Svg
  illus
  id="sorted"
  w="6"
  h="8"
  class="sorter-54n-CX mrg-xs mrg--l {isAscending ? 'asc-w1eLcA' : ''}" />

<style>
  :global(.sorter-54n-CX) {
    vertical-align: initial;
    margin-right: -14px;
  }
  :global(.asc-w1eLcA) {
    --sorter-up: var(--waterloo);
    --sorter-down: var(--mystic);
  }
</style>
