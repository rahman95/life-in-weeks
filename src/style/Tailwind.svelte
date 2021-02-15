<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    html {
        @apply text-gray-500 antialiased bg-white;
    }
    main {
        @apply space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden;
    }
    button {
        @apply w-full h-12 sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 
            text-white text-lg leading-6 font-semibold py-3 px-6 
            border border-transparent rounded-xl 
            focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none 
            transition-colors duration-200;
    }
</style>