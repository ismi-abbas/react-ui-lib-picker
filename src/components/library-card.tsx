import { Card, CardFooter, CardHeader } from "./card";
import type { Library } from "@/lib/types";
import { Download, StarIcon } from "lucide-react";

export default function LibraryCard({
	library,
}: {
	library: Library;
}) {
	return (
		<Card
			key={library.id}
			className="group flex min-h-[180px] w-auto flex-col items-start justify-between rounded-md border border-slate-200 bg-white text-slate-900 transition-all duration-200 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-100"
		>
			<CardHeader className="flex min-w-full items-start justify-between pb-4 dark:border-slate-600">
				<div className="flex w-full flex-col items-start gap-2">
					<div className="flex w-full justify-between">
						<span className="text-lg">{library.name}</span>
						<div className="flex gap-2">
							{library.stars !== undefined && (
								<div className="flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
									<StarIcon className="h-4 w-4 text-yellow-500" />
									<span className="text-xs">
										{new Intl.NumberFormat("en-US", {
											notation: "compact",
										}).format(library.stars)}
									</span>
								</div>
							)}
							{library.totalDownloads !== undefined && (
								<div className="flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-900 dark:bg-slate-800 dark:text-slate-100">
									<Download className="h-4 w-4 text-yellow-500" />
									<span className="text-xs">
										{new Intl.NumberFormat("en-US", {
											notation: "compact",
										}).format(library.totalDownloads)}
									</span>
								</div>
							)}
						</div>
					</div>
					<span className="text-start text-xs">{library.description}</span>
					<div className="flex gap-2">
						{library.categories.map((category) => (
							<span
								key={category}
								className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700 text-xs dark:bg-slate-600 dark:text-slate-300"
							>
								{category}
							</span>
						))}
					</div>
				</div>
			</CardHeader>
			<CardFooter className="flex flex-col gap-4 pt-4 text-slate-600 dark:border-slate-600 dark:text-slate-400">
				<div className="flex items-center gap-4">
					<a
						href={library.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 transition-colors hover:text-primary dark:hover:text-secondary"
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
						href={`https://github.com/${library.repoOwner}/${library.repoName}`}
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
	);
}
