import { additionalFeatures, allLib, mainFeatures } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion";
import { Button } from "@/components/button";
import LibraryCard from "@/components/library-card";
import { getNPMDownloadStats } from "@/utils";
import type { Library, NPMDateSort } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";

export const Route = createFileRoute("/")({
	component: App,
});

const getPackageInfo = async (libraries: Library[], dateFilter: NPMDateSort) => {
	const updatedLibraries = await Promise.all(
		libraries.map(async (library) => {
			const npmDownloads = await getNPMDownloadStats(library.packageName, dateFilter);
			try {
				const response = await fetch(`https://api.github.com/repos/${library.repoOwner}/${library.repoName}`, {
					headers: {
						Accept: "application/vnd.github+json",
						Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
						"X-GitHub-Api-Version": "2022-11-28",
					},
				});
				const data = await response.json();
				return {
					...library,
					stars: data.stargazers_count,
					description: data.description,
					totalDownloads: npmDownloads,
				};
			} catch (error) {
				console.error(`Error fetching stars for ${library.name}:`, error);
				return library;
			}
		}),
	);
	return updatedLibraries;
};

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const [dateSort, setDateSort] = useState<NPMDateSort>("last-week");
	const [sortedBy, setSortedBy] = useState<"downloads" | "stars">("downloads");

	const { data: librariesWithStars, isLoading } = useQuery({
		queryKey: ["libraries", dateSort],
		queryFn: () => getPackageInfo(allLib, dateSort || "lastWeek"),
		enabled: allLib.length > 0,
		staleTime: Number.POSITIVE_INFINITY,
	});

	useEffect(() => {
		const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const savedPreference = localStorage.getItem("darkMode");

		if (savedPreference === "true" || (savedPreference === null && isSystemDark)) {
			setDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			setDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

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
		<div className="flex min-h-screen flex-col items-center gap-5 bg-white transition-colors duration-200 dark:bg-slate-900">
			<header className="sticky top-0 z-50 flex w-full items-center justify-between border-slate-200/50 border-b bg-white/80 p-4 shadow-sm backdrop-blur-lg backdrop-saturate-150 after:pointer-events-none after:absolute after:inset-0 after:z-[-1] after:bg-gradient-to-b after:from-white/10 after:to-white/5 dark:border-slate-800/50 dark:bg-slate-900/80 dark:after:from-slate-800/10 dark:after:to-slate-800/5">
				<div className="flex items-center">
					<img src="/logo192.png" alt="React logo" className="mr-2 h-6 w-6 animate-spin duration-[3s]" />
					<h1 className="font-semibold text-2xl text-primary dark:text-secondary">React UI Picker</h1>
				</div>

				<div className="flex space-x-2">
					<Button variant="ghost" className="h-8">
						Github
					</Button>
					<Button variant="ghost" className="group/toggle h-8 w-8 px-0" onClick={toggleTheme}>
						<MoonIcon className="block h-4 w-4 dark:hidden" />
						<SunIcon className="hidden h-4 w-4 dark:block" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</header>

			<main className="mt-20 mb-10 flex w-full max-w-6xl flex-1 flex-col items-center space-y-4 px-4 text-center">
				<div>
					<h1 className="font-bold text-3xl text-slate-900 dark:text-slate-50">
						Find Your Perfect <span className="text-primary dark:text-secondary">React</span> UI Library
					</h1>
					<p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Discover and compare the best React UI libraries to build stunning interfaces. Stop the endless
						searching - find the right tools for your next project.
					</p>
				</div>
				<div className="flex items-center gap-10">
					<div className="flex items-center gap-2">
						<label htmlFor="date-sort" className="font-medium text-slate-900 text-sm dark:text-slate-100">
							Sort By
						</label>
						<Select value={sortedBy} onValueChange={(value) => setSortedBy(value as "downloads" | "stars")}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort By" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="stars">Total Stars</SelectItem>
								<SelectItem value="downloads">Total Downloads</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-2">
						<label htmlFor="date-sort" className="font-medium text-slate-900 text-sm dark:text-slate-100">
							Download Stats:
						</label>
						<Select value={dateSort} onValueChange={(value) => setDateSort(value as NPMDateSort)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="last-day">Last Day</SelectItem>
								<SelectItem value="last-week">Last Week</SelectItem>
								<SelectItem value="last-month">Last Month</SelectItem>
								<SelectItem value="last-year">Last Year</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="mt-6 flex w-full flex-grow sm:mt-8">
					<div className="max-h-fit w-1/4 flex-shrink-0 rounded-md bg-white p-4 shadow-sm transition-colors duration-200 dark:bg-slate-900">
						<div className="mb-10 w-full">
							<Accordion type="multiple">
								<AccordionItem value="main-feature">
									<AccordionTrigger className="text-md text-slate-900 hover:no-underline dark:text-slate-100">
										Main Features
									</AccordionTrigger>
									<AccordionContent className="grid w-full grid-cols-2 gap-1">
										{mainFeatures.map((feature) => (
											<Button key={feature} variant="ghost" size="sm" className="w-full">
												{feature}
											</Button>
										))}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="additional-feature">
									<AccordionTrigger className="text-md text-slate-900 hover:no-underline dark:text-slate-100">
										Additional Features
									</AccordionTrigger>
									<AccordionContent className="grid w-full grid-cols-2 gap-1">
										{additionalFeatures.map((feature) => (
											<Button key={feature} variant="ghost" size="sm" className="w-full">
												{feature}
											</Button>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
					<div className="ml-4 flex-grow overflow-y-auto">
						{isLoading ? (
							<div>Loading...</div>
						) : (
							<div className="grid grid-cols-1 content-start gap-6 lg:grid-cols-2">
								{librariesWithStars
									?.sort((a, b) => {
										if (sortedBy === "stars") {
											return b.stars - a.stars;
										}
										return b.totalDownloads - a.totalDownloads;
									})
									.map((library) => (
										<LibraryCard library={library} key={library.id} />
									))}
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
