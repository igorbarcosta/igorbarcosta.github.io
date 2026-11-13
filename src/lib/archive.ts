export function groupByYear<T>(records: T[], yearOf: (record: T) => string | number | undefined): [string, T[]][] {
  const groups: Record<string, T[]> = {};
  for (const record of records) {
    const year = String(yearOf(record) ?? 'Sem ano informado');
    (groups[year] ??= []).push(record);
  }
  return Object.entries(groups).sort(([a], [b]) => {
    if (a === 'Sem ano informado') return 1;
    if (b === 'Sem ano informado') return -1;
    return b.localeCompare(a);
  });
}
