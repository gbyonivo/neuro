const config = {
  plugins: {
    "@tailwindcss/postcss": {
      purge: {
        content: ["./src/**/*.{js,ts,jsx,tsx}"],
      },
    },
  },
};

export default config;
