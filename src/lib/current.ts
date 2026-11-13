import { getCollection } from 'astro:content';

// Shared selection for the home and Agora; each page chooses its editorial limits.
export async function getCurrentAcademicActivities() {
  const [projects, teaching, supervision] = await Promise.all([
    getCollection('projects'), getCollection('teaching'), getCollection('supervision'),
  ]);
  const priority: Record<string, number> = { mestrado: 1, TCC: 2, 'iniciacao-cientifica': 3, 'projeto-tecnologico': 4, monitoria: 5 };
  return {
    projects: projects.filter((entry) => entry.data.status === 'active')
      .sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.title.localeCompare(b.data.title, 'pt-BR')),
    teaching: teaching.filter((entry) => entry.data.status === 'current')
      .sort((a, b) => b.data.semester.localeCompare(a.data.semester) || a.data.title.localeCompare(b.data.title, 'pt-BR')),
    supervision: supervision.filter((entry) => entry.data.status === 'current')
      .sort((a, b) => (priority[a.data.type] ?? 99) - (priority[b.data.type] ?? 99) || a.data.title.localeCompare(b.data.title, 'pt-BR')),
  };
}

export const publicField = (value: string | undefined) => value?.startsWith('TODO:') ? undefined : value;
