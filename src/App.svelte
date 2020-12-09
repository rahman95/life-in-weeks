<script lang="ts">
	import SvelteSeo from "svelte-seo";
	import Tailwind from './style/Tailwind.svelte';
</script>

<style>
	.wrapper {
		@apply px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8;
	}

	h1 {
		@apply text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10;
	}
	p {
		@apply max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11;
	}

	button {
		@apply w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200;
	}
</style>


<SvelteSeo
  title="My Life in Weeks | RYounus"
  description="Life's progress made visible..."
/>
<Tailwind />
<main>
	<div class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
		<div class="wrapper">
			<h1>My Life in Weeks</h1>

			<p class="text-gray-900 font-bold">Life's progress made visible...</p> 
			<p>Visualising your life in weeks can <i class="font-light">feel weird</i> and <i class="font-light">maybe morbid</i> to some but it can be prove to be a good indicator of where you currently are in life.</p>
			<p class="text-gray-900">Start by entering your <i class="font-light">date of birth</i> and <i class="font-light">estimated life expectancy</i>✨ </p> 

			<div class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center">	
				<div class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
					<div class="text-gray-900">
						<span class="hidden sm:inline text-gray-500" aria-hidden="true">📅 </span>
						<input type="date" name="date-of-birth" class="focus:outline-none focus:border-gray-400 focus:ring-0" />
					</div>					
				</div>

				<div class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-2 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
					<div class="text-gray-900">
						<span class="hidden sm:inline text-gray-500" aria-hidden="true">😵 </span>
						<input type="number" min="10" max="100" placeholder="75" name="life-expectancy" class="w-16 focus:outline-none focus:border-gray-400 focus:ring-0" />
					</div>					
				</div>

				<button>Calculate</button>
			</div>
		</div>

	</div>
</main>