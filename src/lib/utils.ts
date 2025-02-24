import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Library, NPMDateSort } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getNPMDownloadStats(packageName: string, dateFilter: NPMDateSort) {
	const response = await fetch(`https://api.npmjs.org/downloads/point/${dateFilter}/${packageName}`);

	if (!response.ok) {
		throw new Error("Failed to get NPM download stats");
	}

	const data = await response.json();
	console.log(data);
	return data.downloads;
}

export const getPackageInfo = async (libraries: Library[], dateFilter: NPMDateSort) => {
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
