<script context="module" lang="ts">
  export type Votes = {
    totalVotes: number
    userVotes: number
  }

  export const newVotes = () => ({ totalVotes: 0, userVotes: 0 })
</script>

<script lang="ts">
  import { vote, VoteType } from '@/api/vote'
  import LikeButton from '@/ui/LikeButton/svelte'
  import { CreationType } from '@/ui/Profile/types'

  let className = ''
  export { className as class }
  export let id: number
  export let type: CreationType
  export let disabled = false
  export let votes: Votes = newVotes()
  export let onVote

  function onClick() {
    onVote?.()
    vote(id, getVoteType()).catch(() => {
      votes.totalVotes -= 1
      votes.userVotes -= 1
    })
  }

  function getVoteType() {
    switch (type) {
      case CreationType.Layout:
        return VoteType.Layout
      case CreationType.Watchlist:
        return VoteType.Watchlist
      case CreationType.Dashboard:
        return VoteType.Dashboard
    }
  }
</script>

<LikeButton
  onVote={onClick}
  {disabled}
  class={className}
  bind:userVotes={votes.userVotes}
  bind:totalVotes={votes.totalVotes}
/>
