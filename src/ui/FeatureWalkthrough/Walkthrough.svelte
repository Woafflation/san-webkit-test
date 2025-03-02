<script lang="ts">
  import Svg from '@/ui/Svg/svelte'
  import Background from './Background.svelte'
  import Feature from './Feature.svelte'
  import { FeatureWalkthrough$ } from './context'

  export let features: SAN.Walkthrough[]

  let cursor = 0

  $: feature = features[cursor]
  $: highlightedNode = document.querySelector('#' + (feature.nodeId || feature.id))
  $: highlightedNode?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  $: rect = highlightedNode?.getBoundingClientRect() || { bottom: -14, x: 7 }
  $: align = (rect, feature.align || 'left')
  $: ({ bottom, x, right } = rect)
  $: xPosition = x - 7
  $: if (x + 200 >= window.innerWidth) {
    align = 'right'
  }
  $: if (align === 'right') {
    xPosition = window.innerWidth - right - 7
  }

  $: hasPrevious = cursor > 0
  $: hasNext = cursor < features.length - 1

  function onClose() {
    FeatureWalkthrough$.complete()
    FeatureWalkthrough$.clear()
  }

  const onNext = () => cursor++
  const onPrevious = () => cursor--
</script>

<Background {rect} />

<div class="border" style="top:{window.scrollY + bottom + 14}px;{align}:{xPosition}px">
  <Feature {feature} />

  <button class="close btn" on:click={onClose}>
    <Svg id="close" w="12" />
  </button>

  <div class="row v-center mrg-xl mrg--t">
    <div class="dots row mrg-a mrg--r">
      {#if features.length > 1}
        {#each features as _, i}
          <div
            class="dot btn mrg-s mrg--r"
            class:active={cursor === i}
            on:click={() => (cursor = i)}
          />
        {/each}
      {/if}
    </div>

    {#if hasPrevious}
      <div class="btn-2 mrg-s mrg--r" on:click={onPrevious}>Previous</div>
    {/if}

    <div class="btn-1" on:click={hasNext ? onNext : onClose}>
      {hasNext ? 'Next' : 'Close'}
    </div>
  </div>
</div>

<style lang="scss">
  .border {
    position: absolute;
    z-index: 99;
    background: var(--white);
    padding: 20px 24px 32px;
    max-width: 400px;
  }

  .close {
    position: absolute;
    top: 23px;
    right: 23px;
    --fill: var(--waterloo);
    --fill-hover: var(--green);
  }

  .dot {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    --bg: var(--green-light-3);
    --bg-hover: var(--green-hover);
  }

  .active {
    --bg: var(--green);
  }
</style>
