// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#025CCA',
        secondary: '#ffed4a',
        danger: '#BE3E3F',
        success: '#025CCA',
        blackbg:'#1a1a1a',
        blackbg2:'#1C1C1C',
        blackbg3:'#262626',
        blackgrey:'#ABABAB',
        yellowbg:'#F6B100',
        whitebg:'#F5F5F5',

       
      },
    },
  },
  plugins: [],
};