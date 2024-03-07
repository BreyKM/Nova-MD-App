/** @type {import('tailwindcss').Config} */

import svelteUx from 'svelte-ux/plugins/tailwind.cjs';

export default {
    ux: {
       themes: {
        dark: {
            primary: '#1f1f1f',
            'primary-content': '#fafafa',
            secondary: '#3e92cc',
            'surface-100': '#2B2B2B'
        }
       } 
    },
    content: [
        "./index.html",
        "./src/**/*.{html,svelte,js,ts,}",
        "./electron/**/*.{html,svelte,js,ts,}",
        './node_modules/svelte-ux/**/*.{svelte,js}'
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
        svelteUx,
    ],
}