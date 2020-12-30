<script lang="ts">
    import debounce from 'lodash/debounce'

    import { formStore } from './store'
    import { getAgeInWeeks, getWeeksFromDoB } from './helpers/dateHelper'
    import { renderCanvas } from './helpers/canvasHelper'

    // local bindings
    let dateOfBirth: string;
    let lifeExpectancy: number;

    const renderResults = () => {
        if($formStore.dateOfBirth.length == 0) {
            return
        }

        renderCanvas("resultsCanvas", getWeeksFromDoB(dateOfBirth), getAgeInWeeks(lifeExpectancy))
    }

    formStore.subscribe(value => {
        // dont update/set if value = 0
        if(value.dateOfBirth.length == 0) {
            return
        }

        dateOfBirth = value.dateOfBirth
        lifeExpectancy = value.lifeExpectancy

        renderResults()
    })

    window.addEventListener('resize', debounce(() => {
        renderResults()
    }, 500))
</script>

<style>
    .results-container {
        @apply mt-10 mb-8 sm:mt-14 sm:mb-10;
    }
</style>

<div class="results-container flex justify-center">
    <canvas id="resultsCanvas"></canvas>
</div>