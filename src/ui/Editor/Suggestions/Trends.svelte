<script lang="ts">
  import Svg from '@/ui/Svg/svelte'
  import Suggestions from './Suggestions.svelte'

  export let searchTerm = ''

  export const href = () => 'https://app.santiment.net/labs/trends/explore/' + searchTerm
  export const label = () => '#' + searchTerm

  let items = [0]
</script>

<Suggestions {...$$props} {items}>
  <div class="c-black">
    <Svg id="fire" w="12" h="15" class="$style.svg mrg-xs mrg--r" />
    Link trend
  </div>
</Suggestions>

<style>
  .svg {
    fill: var(--black);
    margin-top: -2px;
  }
</style>
