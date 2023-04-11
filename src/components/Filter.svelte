<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let filter
  export let allChars

  function handleSearch() {
    dispatch('debouncedHandleSearch', filter)
  }
  function updateItems() {
    dispatch('handleChange', filter)
  }
</script>

<form
  class="flex flex-col gap-4 md:flex-row"
  on:submit|preventDefault={updateItems}
>
  <div class="basis-10/12 flex flex-col relative">
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          /></svg
        >
      </div>
      <input
        type="text"
        id="simple-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
        placeholder="Search"
        required
        bind:value={filter.query}
        on:input={handleSearch}
      />
    </div>

    {#if filter.query && allChars.length}
      <ul
        class="absolute p-4 bg-white shadow-lg w-full top-full p-100 rounded-b-lg max-h-32 overflow-y-scroll"
      >
        {#each allChars as char}
          <li
            class="hover:text-black text-gray-500 cursor-pointer my-2 border-b"
          >
            <button on:click={() => (filter.query = char.name)}>
              {char.name}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="flex items-center">
    <p class="text-gray-500">Sort:</p>
    <select
      class="relative"
      name="sort"
      id="sort"
      bind:value={filter.sort}
      on:change={updateItems}
    >
      <option value="" selected disabled hidden>Sort by:</option>
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
  </div>
</form>
