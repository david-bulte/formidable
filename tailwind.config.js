module.exports = {
  mode: 'jit',
  // mode: process.env.TAILWIND_MODE ? 'jit' : '',
  purge: {
    // enabled: process.env.TAILWIND_MODE === 'build',
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
