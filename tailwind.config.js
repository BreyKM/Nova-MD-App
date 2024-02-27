/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,svelte,js,ts,}",
        "./electron/**/*.{html,svelte,js,ts,}"
    ],
    theme: {
        colors: {
            'black': '#2B2B2B'
        },
        extend: {
            fontFamily: {
                jost: ['Jost', "sans-serif"]
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}