/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				salmon: "#ff7f51",
				green: "#81b29a",
				gray: "#e5e5e5",
				darkGray: "#8a8a8a",
				black: "#262626",
			},
			fontFamily: {
				poppins: "'Poppins', sans-serif;",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, transform: "translateY(-5%)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
				rainbow: {
					"0%": { color: "#714eb3" },
					"16.6%": { color: "#5286da" },
					"33.3%": { color: "#6dbb5b" },
					"49.9%": { color: "#eddf2b" },
					"66.6%": { color: "#f98d52" },
					"83.3%": { color: "#e14e65" },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-4deg)" },
					"50%": { transform: "rotate(4deg)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-out forwards",
				delayFadeIn: "fadeIn 0.5s 0.25s ease-out forwards",
				rainbow: "rainbow 10s ease-in-out infinite",
				wiggle: "wiggle 1s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
