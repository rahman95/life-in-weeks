<script lang="ts">
    import { formStore } from './store'
    import { getAgeInWeeks } from './helpers/dateHelper'

    // local bindings
    let dateOfBirth: string;
    let age: number;
    let lifeExpectancy: number;

    formStore.subscribe(value => {
        if(value.dateOfBirth.length == 0 || value.age == null) {
            console.log('value not set yet')
            return
        }

        dateOfBirth = value.dateOfBirth
        age = value.age
        lifeExpectancy = value.lifeExpectancy

        console.log('value updated')
        console.log({dateOfBirth, age, lifeExpectancy})

        // TODO: needs fixing - not accurate as it doesnt include weeks lapsed in current year for age
        console.log('your age in weeks', getAgeInWeeks(age))
        console.log('life expectancy in weeks', getAgeInWeeks(lifeExpectancy))
    })
</script>

<style>
    .results-container {
        @apply mt-10 mb-8 sm:mt-14 sm:mb-10;
    }
    p {
		@apply max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 text-center;
	}
</style>

<div class="results-container">
    <p>Results rendered here</p>
</div>