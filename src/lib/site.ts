export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}` || '/';
}

export function formatDate(date: Date | undefined) {
  if (!date) return '';
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date).replace('.', '');
}

export function formatProjectPeriod(start: Date, end?: Date) {
  return `${formatDate(start)} – ${end ? formatDate(end) : 'atual'}`;
}

export function formatStatus(status: string) {
  const labels: Record<string, string> = {
    active: 'Em andamento',
    current: 'Atual',
    planned: 'Planejado',
    completed: 'Concluído',
    archived: 'Arquivado',
    pending: 'Pendente',
  };
  return labels[status] ?? status;
}

export function formatProjectType(type: string) {
  const labels: Record<string, string> = {
    research: 'Pesquisa',
    innovation: 'Inovação',
    technology: 'Desenvolvimento tecnológico',
    'open-source': 'Open source',
    institutional: 'Institucional',
    other: 'Outro',
  };
  return labels[type] ?? type;
}

export function formatSupervisionType(type: string) {
  const labels: Record<string, string> = {
    TCC: 'TCC',
    'iniciacao-cientifica': 'Iniciação científica',
    'projeto-tecnologico': 'Projeto tecnológico',
    mestrado: 'Mestrado',
    outro: 'Outro',
  };
  return labels[type] ?? type;
}

export function formatSupervisionCourse(course: string) {
  const labels: Record<string, string> = {
    'Engenharia de Computação': 'Bacharelado em Engenharia de Computação',
    Telemática: 'Curso Superior de Tecnologia em Telemática',
    Informática: 'Técnico Integrado em Informática',
  };
  return labels[course] ?? course;
}
