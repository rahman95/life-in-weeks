<script>
    import { formStore } from './store'
    import { formValidationSchema, extractErrors } from './validation/schema';

    let errors = {};
    
    // local bindings
    let dateOfBirth = $formStore.dateOfBirth
    let lifeExpectancy = $formStore.lifeExpectancy

	function handleSubmit() {
		formValidationSchema.validate({dateOfBirth, lifeExpectancy}, { abortEarly: false })
      	.then(() => {
            errors = {}
            formStore.setDateOfBirth(dateOfBirth)
            formStore.setLifeExpectancy(lifeExpectancy)
		  })
		.catch(err => {
            console.error(err)
			errors = extractErrors(err)
		});
	}
</script>

<style>
    form {
        @apply flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center;
    }
    .form-wrapper {
        @apply w-full sm:w-auto flex-none;
    }
    .input-wrapper {
        @apply bg-gray-50 text-gray-900 hover:text-gray-900
            font-mono leading-6 py-3 sm:px-6
            border border-gray-200 rounded-xl 
            flex items-center justify-center 
            space-x-2 sm:space-x-4 
            focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none 
            transition-colors duration-200;
    }
    .input-span {
        @apply hidden sm:inline text-gray-500;   
    }

    .input {
        @apply focus:outline-none focus:border-gray-400 focus:ring-0;
    }
    .error-span {
        @apply text-red-500 text-sm italic;
    }
</style>

<form on:submit|preventDefault={handleSubmit}>
    <div class="form-wrapper">
        <div class="input-wrapper">
            <span class="input-span" aria-hidden="true">📅 </span>
            <input class="input" type="date" bind:value={dateOfBirth} name="date-of-birth" />
        </div>
        {#if errors.dateOfBirth}<span class="error-span">{errors.dateOfBirth}</span>{/if}
    </div>
    

    <div class="form-wrapper">
        <div class="input-wrapper">
            <span class="input-span" aria-hidden="true">😵 </span>
            <input class="input w-16" type="number" min="1" max="100" bind:value={lifeExpectancy} name="life-expectancy" />
        </div>
        {#if errors.lifeExpectancy}<span class="error-span">{errors.lifeExpectancy}</span>{/if}	
    </div>

    <button type="submit">Calculate</button>
</form>