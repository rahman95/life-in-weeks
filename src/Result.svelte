<script lang="ts">
    import debounce from 'lodash/debounce'

    import { formStore } from './store'
    import { getAgeInWeeks, getWeeksFromDoB } from './helpers/dateHelper'
    import { renderCanvas, getPixelRatio } from './helpers/canvasHelper'

    // local bindings
    let dateOfBirth: string;
    let lifeExpectancy: number;
    let collapsed: boolean;

    let rendered: boolean = false;

    const renderResults = () => {
        if($formStore.dateOfBirth.length == 0) {
            rendered = false
            return
        }

        renderCanvas("resultsCanvas", getWeeksFromDoB(dateOfBirth), getAgeInWeeks(lifeExpectancy), getPixelRatio())
        rendered = true
    }

    formStore.subscribe(value => {
        // dont update/set if value = 0
        if(value.dateOfBirth.length == 0) {
            rendered = false
            return
        }

        if(value.dateOfBirth == dateOfBirth && value.lifeExpectancy == lifeExpectancy) {
            collapsed = value.collapsed;
            return
        }

        dateOfBirth = value.dateOfBirth
        lifeExpectancy = value.lifeExpectancy
        
        renderResults()
    })

    window.addEventListener('resize', debounce(() => {
        renderResults()
    }, 500))

    const handleCollapse = (e) => {
        formStore.setCollapsed(!collapsed)
    }
</script>

<style>
    .results-container {
        @apply mt-4 mb-8 sm:mt-8 sm:mb-10;
    }
    button {
        @apply w-full h-12 sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200;
    }
</style>

<div>
    {#if rendered}
    <div class="flex flex-grow justify-end justify-items-end">
        <button class="mr-1.5" on:click={handleCollapse}>Collapse/Expand</button>
    </div>
    {/if}

    <div class="results-container flex justify-center">
        <canvas id="resultsCanvas"></canvas>
    </div>
</div>