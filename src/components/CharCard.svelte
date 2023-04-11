<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let char

  function handleClick() {
    dispatch('updateSelectedChar', char)
  }
</script>

<div class="">
  <button
    on:click={handleClick}
    class="flex md:flex-col h-80 shadow border-gray-200 rounded-md border w-full p-6 hover:shadow-lg transition-all duration-300 md:items-center"
  >
    <img
      src={char.image}
      class="h-full md:h-52 md:w-52 md:h-52 rounded-md"
      alt="character"
    />
    <div class="p-4">
      <h2 class="text-xl font-bold">{char.name}</h2>
    </div>
  </button>
</div>
