export const profile = {
	fullName: 'Igor Barbosa da Costa',
	title: 'PhD',
	occupation: 'Professor',
	institute: 'IFPB - Campina Grande',
	author_name: 'B. C. Igor', // Author name to be highlighted in the papers section
	research_areas: [
		{ title: 'Artificial Inteligence', 
		  description: 'Agentic AI and Deep Learning', 
		  field: 'computer-science' },
		{ title: 'Data Sicence', 
		  description: 'Statistics, Data Mining and Machine Learning', 
		  field: 'computer-science' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'igor.costa@ifpb.edu.br',
	linkedin: 'https://www.linkedin.com/in/igorbarcosta/',
	x: '',
	github: 'https://github.com/igormago',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
}

export const template = {
	website_url: 'https://igorbarcosta.github.io',
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '/' // Repository name starting with /
}

export const seo = {
	default_title: 'Prof. Igor Barbosa da Costa',
	default_description: 'Site Pessoal',
	default_image: '/images/astro-academia.png',
}
