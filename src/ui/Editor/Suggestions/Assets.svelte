<script lang="ts">
  import { queryProjects } from '@/api/projects'
  import ProjectIcon from '@/ui/ProjectIcon.svelte'
  import Suggestions from './Suggestions.svelte'

  export let searchTerm = ''

  export const href = ({ slug }) => 'https://app.santiment.net/projects/' + slug
  export const label = ({ ticker }) => '$' + ticker.toUpperCase()

  let loading = true
  let projects = [] as any[]
  let items = projects

  queryProjects().then((data) => {
    projects = data
    loading = false
  })

  $: projects, onInput(searchTerm)

  function onInput(searchTerm: string) {
    const value = searchTerm.toLowerCase()
    items = projects.filter(({ name, ticker }) => {
      return name.toLowerCase().includes(value) || ticker.toLowerCase().includes(value)
    })
  }
</script>

<Suggestions {...$$props} {items} {loading} key="slug" let:item>
  <ProjectIcon slug={item.slug} class="mrg-s mrg--r" />
  <span class="name">{item.name}</span>
  <span class="c-waterloo mrg-xs mrg--l">{item.ticker}</span>
</Suggestions>

<style>
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
