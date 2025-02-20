export type Library = {
	id: number;
	name: string;
	url: string;
	logo: string;
	repoOwner: string;
	repoName: string;
	categories: string[];
	features: {
		main: MainFeature[];
		additional: AdditionalFeature[];
	};
	description?: string;
	packageName: string;
	stars: number;
	totalDownloads: number;
};

export type MainFeature =
	| "Styled"
	| "Unstyled"
	| "Imported"
	| "Copy Paste"
	| "Components"
	| "CSS Only"
	| "Free"
	| "CSS-in-JS"
	| "Tailwind Based";

export type AdditionalFeature =
	| "Fully Accessible"
	| "Built-in Themes"
	| "Theme Generator"
	| "Dark Mode"
	| "Semantic Colors"
	| "Figma files"
	| "Official"
	| "Public Roadmap"
	| "RTL Support"
	| "Fully Typed"
	| "Form Helpers";

export type NPMDateSort = "last-week" | "last-month" | "last-day" | "last-year";
