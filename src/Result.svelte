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

    ul {
	 list-style: none;
	 margin: 0;
	 padding: 0;
}
 .x-axis {
	 bottom: 0;
	 position: absolute;
	 text-align: center;
	 width: 100%;
}
 .x-axis li {
	 margin-right: 10.5%;
	 width: 11.5%;
}
 .x-axis li:last-child {
	 margin-right: 0;
}
 .y-axis {
	 position: absolute;
	 text-align: right;
	 width: 100%;
}
 .y-axis li {
	 display: block;
	 height: 65px;
	 width: 100%;
}
 .y-axis li span {
    text-orientation: sideways;
    writing-mode: vertical-rl;
	 display: block;
	 margin: -10px 0 0 -60px;
	 padding: 0 10px;
	 width: 40px;
}
</style>

<div>
    {#if rendered}
    <div class="flex flex-grow justify-end justify-items-end">
        <button class="mr-1.5" on:click={handleCollapse}>Collapse/Expand</button>
    </div>
    {/if}

    <div class="results-container flex">
        <!-- {#if rendered}
        <div class="flex flex-col flex-grow">
            <hr class="relative top-2 sm:top-3 border-l-2 sm:border-l-3 md:border-l-4 border-gray-500 w-full mx-2 md:mx-3 lg:mx-4">
            <span style="writing-mode: vertical-rl;">Years</span>
        </div>
        <div class="flex flex-row flex-grow justify-end justify-items-end py-3">
            <hr class="relative top-2 sm:top-3 border-t-2 sm:border-t-3 md:border-t-4 border-gray-500 w-full mx-2 md:mx-3 lg:mx-4"> 
            <span class="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg mx-2 md:mx-3 lg:mx-4">Weeks</span>

            <canvas id="resultsCanvas"></canvas>
        </div>
         -->
        <!-- {/if} -->
        <!-- <div class="flex flex-grow">
        </div> -->

        <ul class="x-axis">
            <li class="float-right">
                <span class="text-3xl">Weeks</span>
            </li>
        </ul>
        <ul class="y-axis">
            <li>
                <span class="text-3xl">Years</span>
            </li>
        </ul>

    </div>
</div>