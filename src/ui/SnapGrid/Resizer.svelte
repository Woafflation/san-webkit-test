<script lang="ts">
  import { getSnapGridCtx } from './context'
  import { Resizer } from './resize'

  const snapGrid = getSnapGridCtx()
  const { onDragStart } = Resizer(snapGrid)
</script>

<div on:mousedown|capture={onDragStart} />

<style>
  div {
    cursor: se-resize;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
  }

  div:hover::after {
    opacity: 1;
    --black: var(--green-hover);
  }

  div::after {
    content: '';
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 5px;
    height: 5px;
    opacity: 0.5;
    border-right: 2px solid var(--black);
    border-bottom: 2px solid var(--black);
  }

  :global(.snap-item_resizing) {
    opacity: 0.8;
    z-index: 8;
    will-change: width, height;
  }
</style>
