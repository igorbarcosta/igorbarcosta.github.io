export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}` || '/';
}

export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', timeZone: 'UTC' }).format(date).replace('.', '');
}

export function formatDate(date: Date | undefined) {
  if (!date) return '';
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date).replace('.', '');
}

export function formatPeriod(start?: Date, end?: Date) {
  if (!start && !end) return '';
  if (!start && end) return formatDate(end);
  if (start && !end) return `${formatDate(start)} – atual`;

  const startYear = start!.getUTCFullYear();
  const endYear = end!.getUTCFullYear();

  if (startYear === endYear) {
    if (start!.getUTCMonth() === end!.getUTCMonth()) {
      return formatDate(start);
    }
    return `${formatMonth(start!)} – ${formatDate(end!)}`;
  }
  return `${formatDate(start!)} – ${formatDate(end!)}`;
}

export function formatProjectPeriod(start?: Date, end?: Date, year?: number) {
  return start || end ? formatPeriod(start, end) : String(year ?? '');
}

export function formatSupervisionPeriod(data: {
  start?: Date;
  end?: Date;
  semester?: string;
  year?: number;
  defense?: { date: Date };
}) {
  if (data.start) {
    return formatPeriod(data.start, data.end ?? data.defense?.date);
  }
  if (data.semester) {
    return data.semester;
  }
  if (data.defense?.date) {
    return formatDate(data.defense.date);
  }
  if (data.end) {
    return formatDate(data.end);
  }
  return String(data.year ?? '');
}

export function formatStatus(status: string) {
  const labels: Record<string, string> = {
    active: 'Em andamento',
    current: 'Em andamento',
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
    extension: 'Extensão',
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
    monitoria: 'Monitoria',
    competicao: 'Competição',
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
