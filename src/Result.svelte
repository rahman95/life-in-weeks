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
    .button-wrapper {
        @apply flex flex-grow mt-2 justify-end justify-items-end
    }
    .results-container {
        @apply flex justify-center mt-4 mb-8 sm:mt-8 sm:mb-5;
    }
</style>

<div>
    {#if rendered}
    <div class="button-wrapper">
        <button on:click={handleCollapse}>Collapse/Expand</button>
    </div>
    {/if}

    <div class="results-container">
        <canvas id="resultsCanvas"></canvas>
    </div>
</div>