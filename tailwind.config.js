/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				blue: "#2948ff",
				green: "#81b29a",
				orange: "#fb5607",
				red: "#e63946",
				gray: "#e5e5e5",
				darkGray: "#8a8a8a",
				black: "#2f2f2f",
			},
			fontFamily: {
				poppins: "'Poppins', sans-serif;",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, transform: "translateY(-6px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-4deg)" },
					"50%": { transform: "rotate(4deg)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-out forwards",
				delayFadeIn: "fadeIn 0.5s 0.25s ease-out forwards",
				wiggle: "wiggle 1s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
