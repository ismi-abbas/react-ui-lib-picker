import { MoonIcon, SunIcon, StarIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/accordion";
import { Button } from "../components/button";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader } from "../components/card";

type Library = {
	id: number;
	name: string;
	url: string;
	github: string;
	stars?: number;
	categories: string[];
};

const allLib: Library[] = [
	{
		id: 1,
		name: "Chakra UI",
		url: "https://chakra-ui.com/",
		github: "chakra-ui/chakra-ui",
		categories: ["UI Framework", "Design System", "Accessible"],
	},
	{
		id: 2,
		name: "Mantine",
		url: "https://mantine.dev/",
		github: "mantinedev/mantine",
		categories: ["UI Framework", "Design System", "Modern"],
	},
	{
		id: 3,
		name: "Material UI",
		url: "https://mui.com/",
		github: "mui/material-ui",
		categories: ["UI Framework", "Design System", "Enterprise"],
	},
	{
		id: 4,
		name: "Tailwind CSS",
		url: "https://tailwindcss.com/",
		github: "tailwindlabs/tailwindcss",
		categories: ["CSS Framework", "Utility First"],
	},
	{
		id: 5,
		name: "Bootstrap",
		url: "https://getbootstrap.com/",
		github: "twbs/bootstrap",
		categories: ["CSS Framework", "Design System"],
	},
	{
		id: 6,
		name: "Ant Design",
		url: "https://ant.design/",
		github: "ant-design/ant-design",
		categories: ["UI Framework", "Design System", "Enterprise"],
	},
	{
		id: 7,
		name: "Framer Motion",
		url: "https://www.framer.com/motion/",
		github: "framer/motion",
		categories: ["Animation", "Interactive"],
	},
	{
		id: 8,
		name: "Radix UI",
		url: "https://www.radix-ui.com/",
		github: "radix-ui/primitives",
		categories: ["Headless UI", "Accessible", "Primitives"],
	},
	{
		id: 9,
		name: "Shadcn UI",
		url: "https://ui.shadcn.com/",
		github: "shadcn/ui",
		categories: ["Component Library", "Modern", "Customizable"],
	},
	{
		id: 10,
		name: "Next UI",
		url: "https://nextui.org/",
		github: "nextui-org/nextui",
		categories: ["UI Framework", "Modern", "Accessible"],
	},
	{
		id: 11,
		name: "DaisyUI",
		url: "https://daisyui.com/",
		github: "saadeghi/daisyui",
		categories: ["Tailwind Components", "Theme System"],
	},
	{
		id: 12,
		name: "Headless UI",
		url: "https://headlessui.com/",
		github: "tailwindlabs/headlessui",
		categories: ["Headless UI", "Accessible", "Primitives"],
	},
	{
		id: 13,
		name: "React Spring",
		url: "https://react-spring.dev/",
		github: "pmndrs/react-spring",
		categories: ["Animation", "Interactive"],
	},
	{
		id: 14,
		name: "React Aria",
		url: "https://react-spectrum.adobe.com/react-aria/",
		github: "adobe/react-spectrum",
		categories: ["Headless UI", "Accessible", "Adobe"],
	},
	{
		id: 15,
		name: "TanStack Table",
		url: "https://tanstack.com/table/",
		github: "TanStack/table",
		categories: ["Data Display", "Table", "Enterprise"],
	},
	{
		id: 16,
		name: "React Hook Form",
		url: "https://react-hook-form.com/",
		github: "react-hook-form/react-hook-form",
		categories: ["Form Management", "Validation"],
	},
	{
		id: 17,
		name: "React Query",
		url: "https://tanstack.com/query/",
		github: "TanStack/query",
		categories: ["Data Fetching", "Cache Management"],
	},
	{
		id: 18,
		name: "React Select",
		url: "https://react-select.com/",
		github: "JedWatson/react-select",
		categories: ["Form Components", "Accessible"],
	},
];

const mainFeatures = [
	"Styled",
	"CSS-in-JS",
	"Tailwind Based",
	"Unstyled",
	"CSS Only",
];

const additionalFeatures = [
	"Fully Typed",
	"Accessibility",
	"Unstyled",
	"CSS Only",
];

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [libraries, setLibraries] = useState<Library[]>(allLib);

	useEffect(() => {
		const isSystemDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const savedPreference = localStorage.getItem("darkMode");

		if (
			savedPreference === "true" ||
			(savedPreference === null && isSystemDark)
		) {
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			setDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	useEffect(() => {
		async function fetchGithubStars() {
			try {
				const updatedLibraries = await Promise.all(
					libraries.map(async (library) => {
						try {
							const response = await fetch(
								`https://api.github.com/repos/${library.github}`,
							);
							const data = await response.json();
							return { ...library, stars: data.stargazers_count };
						} catch (error) {
							console.error(`Error fetching stars for ${library.name}:`, error);
							return library;
						}
					}),
				);
				setLibraries(updatedLibraries);
			} catch (error) {
				console.error("Error fetching GitHub stars:", error);
			}
		}

		fetchGithubStars();
	}, [libraries]);

	const toggleTheme = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.setItem("darkMode", newDarkMode.toString());

		if (newDarkMode) {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.classList.add("light");
		}
	};

	return (
		<div className="flex flex-col items-center gap-5 bg-white dark:bg-slate-900 transition-colors duration-200">
			<header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg backdrop-saturate-150 p-4 w-full flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm after:absolute after:inset-0 after:z-[-1] after:bg-gradient-to-b after:from-white/10 after:to-white/5 dark:after:from-slate-800/10 dark:after:to-slate-800/5 after:pointer-events-none z-50">
				<h1 className="text-xl font-semibold text-primary dark:text-secondary">
					React UI Picker
				</h1>
				<div className="flex">
					<Button
						variant="ghost"
						className="group/toggle h-8 w-8 px-0 hover:bg-slate-100 dark:hover:bg-slate-800"
						onClick={toggleTheme}
					>
						<MoonIcon className="hidden h-4 w-4 [html.light_&]:block" />
						<SunIcon className="hidden h-4 w-4 [html.dark_&]:block" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</header>

			<main className="mt-20 flex w-full max-w-6xl flex-1 flex-col items-center space-y-4 px-4 text-center mb-10">
				<div>
					<h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
						Find Your Perfect{" "}
						<span className="text-primary dark:text-secondary">React</span> UI
						Library
					</h1>
					<p className="max-w-2xl text-slate-600 dark:text-slate-400 mt-4">
						Discover and compare the best React UI libraries to build stunning
						interfaces. Stop the endless searching - find the right tools for
						your next project.
					</p>
				</div>
				<div className="mt-6 flex w-full flex-grow sm:mt-8">
					<div className="w-1/4 max-h-fit flex-shrink-0 rounded-md bg-white dark:bg-slate-900 p-4 shadow-sm transition-colors duration-200">
						<div className="w-full mb-10">
							<Accordion type="multiple">
								<AccordionItem value="main-feature">
									<AccordionTrigger className="text-slate-900 dark:text-slate-100 text-md hover:no-underline">
										Main Features
									</AccordionTrigger>
									<AccordionContent className="grid w-full grid-cols-2 gap-1">
										{mainFeatures.map((feature) => (
											<Button
												key={feature}
												variant="ghost"
												size="sm"
												className="w-full"
											>
												{feature}
											</Button>
										))}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="additional-feature">
									<AccordionTrigger className="text-slate-900 dark:text-slate-100 text-md hover:no-underline">
										Additional Features
									</AccordionTrigger>
									<AccordionContent className="grid w-full grid-cols-2 gap-1">
										{additionalFeatures.map((feature) => (
											<Button
												key={feature}
												variant="ghost"
												size="sm"
												className="w-full"
											>
												{feature}
											</Button>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
					<div className="ml-4 flex-grow overflow-y-auto">
						<div className="grid grid-cols-1 content-start gap-6 lg:grid-cols-2">
							{libraries.map((library) => (
								<Card
									key={library.id}
									className="group bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 min-h-[180px] w-auto rounded-md border border-slate-200 dark:border-slate-800 px-3 py-2 flex flex-col items-start justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary dark:hover:border-secondary"
								>
									<CardHeader className=" flex items-center justify-between pb-4 border-slate-200 dark:border-slate-600">
										<div className="flex flex-col items-start gap-2">
											<span className="text-lg">{library.name}</span>
											<div className="flex gap-2">
												{library.categories.map((category) => (
													<span
														key={category}
														className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
													>
														{category}
													</span>
												))}
											</div>
										</div>
									</CardHeader>
									{/* <div className="relative py-4 group-hover:transform group-hover:scale-105 transition-transform duration-200">
										<img
											src="/logo.png"
											alt={library.name}
											width={100}
											height={100}
											className="mx-auto"
										/>
									</div> */}
									<CardFooter className="text-slate-600 dark:text-slate-400 flex flex-col gap-4 pt-4 dark:border-slate-600">
										{library.stars !== undefined && (
											<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-fit">
												<StarIcon className="h-4 w-4 text-yellow-500" />
												<span className="text-sm font-semibold">
													{library.stars.toLocaleString()}
												</span>
												<span className="text-xs text-slate-500 dark:text-slate-400">
													stars
												</span>
											</div>
										)}
										<div className="flex items-center gap-4">
											<a
												href={library.url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 hover:text-primary dark:hover:text-secondary transition-colors"
											>
												<svg
													className="h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<title>External Link</title>
													<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
													<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
												</svg>
												<span className="text-sm">Documentation</span>
											</a>
											<a
												href={`https://github.com/${library.github}`}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 text-sm transition-colors hover:text-primary dark:hover:text-secondary"
											>
												<svg
													className="h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<title>View on GitHub</title>
													<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
												</svg>
												<span>View on GitHub</span>
											</a>
										</div>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
