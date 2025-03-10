import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NPMDateSort } from "./lib/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getGithubToken() {
	const response = await fetch("https://api.github.com/octocat", {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to get GitHub token");
	}

	const data = await response.json();
	console.log(data);
	return data;
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
