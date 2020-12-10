<script lang="ts">
	import SvelteSeo from "svelte-seo";
	
	import Tailwind from './style/Tailwind.svelte';
	import Form from './Form.svelte'
	import Result from './Result.svelte'
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

			<Form />
			<Result />
		</div>
	</div>
</main>