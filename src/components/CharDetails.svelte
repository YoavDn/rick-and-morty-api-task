<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let char

  let episodeDetail = false

  const firstAppearance = char.episode[0].split('/').pop()
  const lastAppearance = char.episode[char.episode.length - 1].split('/').pop()

  function handleClick() {
    const eventData = {
      close: true,
    }
    dispatch('closeCard', eventData)
  }
</script>

<main>
  {#if char}
    <button
      on:click={handleClick}
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 scoll"
    />

    <div
      class="bg-white min-h-[400px] z-[100] fixed w-80 left-1/2 top-1/2 -translate-x-1/2 md:min-w-[600px] -translate-y-1/2 rounded-lg shadow-lg overflow-hidden flex md:flex-row flex-col"
    >
      <button
        on:click={handleClick}
        class="absolute right-4 top-2 hover:text-gray-500">&#x2715;</button
      >
      <img src={char.image} alt="character" class="object-cover" />
      <div class="flex flex-col gap-2 p-8">
        <h2 class="text-2xl font-bold">{char.name}</h2>
        <div class="flex gap-2 items-center text-lg">
          <p>
            <span
              class={`${
                char.status === 'Alive'
                  ? 'text-green-500'
                  : char.status === 'unknown'
                  ? 'text-gray-600'
                  : 'text-red-500'
              } `}>&#x2022</span
            >
            {char.status} -
          </p>
          <p>{char.species}</p>
        </div>
        <p class="text-gray-500">
          Location: <span class="text-black">{char.location.name}</span>
        </p>

        <p class="text-gray-500">
          Played in: <span class="text-black"
            >{char.episode.length} Total Episodes
          </span>
          <span
            ><button on:click={() => (episodeDetail = !episodeDetail)}
              >&#8595;</button
            ></span
          >
        </p>

        {#if episodeDetail}
          <ul class="overflow-y-scroll max-h-32 border-b broder-gray-500">
            {#each char.episode as episode}
              <li>Episode {episode.split('/').pop()}</li>
            {/each}
          </ul>
        {/if}

        {#if firstAppearance !== lastAppearance}
          <p class="text-gray-500">
            First appearance: <span class="text-black">E{firstAppearance}</span>
          </p>
          <p class="text-gray-500">
            Last appearance: <span class="text-black">E{lastAppearance}</span>
          </p>
        {:else}
          <p class="text-gray-500">
            Final appearance: <span class="text-black">{lastAppearance}</span>
          </p>
        {/if}
      </div>
    </div>
  {/if}
</main>
