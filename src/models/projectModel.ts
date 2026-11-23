export interface ProjectModel {
	title: string;
	summary: string;
	features: string[];
	technologies: string[];
	images?: { image: string; label: string }[];
	projectLink?: string | null;
	gitHubLink?: string;
	gitHubLinks?: { label: string; url: string }[];
}
