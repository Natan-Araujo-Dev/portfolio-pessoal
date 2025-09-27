export interface ProjectModel {
	title: string;
	summary: string;
	features: string[];
	technologies: string[];
	projectLink?: string | null;
	gitHubLink: string;
}
