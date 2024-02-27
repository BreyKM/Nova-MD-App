/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,svelte,js,ts,}",
        "./electron/**/*.{html,svelte,js,ts,}"
    ],
    theme: {
        extend: {
            fontFamily: {
                jost: ['Jost', "sans-serif"]
            },
            colors: {
                'black': '#2B2B2B',
                'black-900': '#1f1f1f',
                'bone' : '#fafafa',
                'hover-gray': '#474747',
                'hover-red': '#FF4D4D',
                'nav-gray': '#3D3D3D'
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}