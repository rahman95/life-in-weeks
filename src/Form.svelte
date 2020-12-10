<script lang="ts">
    import { formValidationSchema, extractErrors } from './schema';
	import type { ErrorObject, FormModel } from "./types";

	let model: FormModel = {
		lifeExpectancy: 75,
		dateOfBirth: ''
    }

	let errors: ErrorObject = {};

	function handleSubmit() {
		formValidationSchema.validate(model, { abortEarly: false })
      	.then(() => {
        	errors = {}
		  })
		.catch(err => {
            console.error(err)
			errors = extractErrors(err)
		});
	}
</script>

<style>
    button {
        @apply w-full h-12 sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200;
    }
</style>

<form class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center" on:submit|preventDefault={handleSubmit}>
    <div class="w-full sm:w-auto flex-none">
        <div class="bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
            <div class="text-gray-900">
                <span class="hidden sm:inline text-gray-500" aria-hidden="true">📅 </span>
                <input type="date" bind:value={model.dateOfBirth} name="date-of-birth" class="focus:outline-none focus:border-gray-400 focus:ring-0" />
            </div>
        </div>
        {#if errors.dateOfBirth}<span class="text-red-500 text-sm italic">{errors.dateOfBirth}</span>{/if}
    </div>
    

    <div class="w-full sm:w-auto flex-none">
        <div class="bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
            <div class="text-gray-900">
                <span class="hidden sm:inline text-gray-500" aria-hidden="true">😵 </span>
                <input type="number" min="1" max="100" bind:value={model.lifeExpectancy} name="life-expectancy" class="w-16 focus:outline-none focus:border-gray-400 focus:ring-0" />
            </div>
        </div>
        {#if errors.lifeExpectancy}<span class="text-red-500 text-sm italic">{errors.lifeExpectancy}</span>{/if}	
    </div>

    <button type="submit">Calculate</button>
</form>