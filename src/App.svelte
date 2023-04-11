<script lang="ts">
  import type { IFilter, IInfo } from './types'
  import { debounce } from 'lodash'
  import { onMount } from 'svelte'
  import { getCharacters } from './services/api.service'
  import CharDetails from './components/CharDetails.svelte'
  import CharCard from './components/CharCard.svelte'
  import LeftArrow from './components/LeftArrow.svelte'
  import RightArrow from './components/RightArrow.svelte'
  import Filter from './components/Filter.svelte'

  let selectedChar = null
  let allChars = []
  let pageInfo: IInfo = { prev: null, count: 0, pages: 1, next: null }

  const filter: IFilter = {
    query: '',
    sort: 'asc',
    page: 1,
  }

  onMount(async () => {
    getItems()
  })

  $: if (filter.page) {
    getItems()
  }

  const debouncedHandleSearch = debounce(() => {
    getItems()
  }, 500)

  async function getItems() {
    const data = await getCharacters(filter)
    if (!data) {
      allChars = []
      pageInfo = { prev: null, count: 0, pages: 1, next: null }
      return
    }

    allChars = data.results
    pageInfo = data.info
  }

  function handleClosePopup(event) {
    if (event.detail.close) selectedChar = null
  }
</script>

<main>
  <section
    class="container px-2 py-10 m-auto flex flex-col gap-4
    "
  >
    <Filter
      {filter}
      {allChars}
      on:debouncedHandleSearch={debouncedHandleSearch}
      on:handleChange={getItems}
    />

    <p class="text-gray-500">Total items: {pageInfo.count}</p>

    {#if allChars.length && pageInfo}
      <div class="grid gap-8 py-8 lg:grid-cols-3 md:grid-cols-2">
        {#each allChars as char}
          <CharCard
            {char}
            on:updateSelectedChar={newChar => (selectedChar = newChar.detail)}
          />
        {/each}
      </div>
      <div class="flex justify-center items-center gap-4">
        <button
          on:click={() => filter.page--}
          disabled={!pageInfo.prev}
          class={` ${
            !pageInfo.prev && 'text-gray-500'
          } rounded-full hover:bg-gray-100  p-2`}
        >
          <RightArrow />
        </button>
        <p class="text-xl font-light">
          {filter.page}
        </p>
        <button
          on:click={() => filter.page++}
          class={`${
            !pageInfo.next && 'text-gray-500'
          } rounded-full hover:bg-gray-100 p-2`}
          disabled={!pageInfo.next}><LeftArrow /></button
        >
      </div>
    {:else}
      <div class="flex flex-col justify-center items-center py-12">
        <img
          src="https://rickandmortyapi.com/api/character/avatar/34.jpeg"
          class="w-32 h-32 rounded-full my-4"
          alt="404 not found"
        />
        <h2 class="text-black text-center text-xl">No characters found...</h2>
        <p class="text-gray-500 font-light">
          Check your spelling or try different keywords and try again
        </p>
        <button
          on:click={() => (filter.query = '')}
          class="bg-gray-100 border-gray-300 border p-2 my-6 rounded-lg"
          >Clear Search</button
        >
      </div>
    {/if}
  </section>
  {#if selectedChar}
    <CharDetails char={selectedChar} on:closeCard={handleClosePopup} />
  {/if}
</main>
