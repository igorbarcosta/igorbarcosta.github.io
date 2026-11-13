import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const academicMilestone = z.object({
  date: z.coerce.date(),
  committee: z.array(z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    institution: z.string().min(1).optional(),
  })).min(2),
  outcome: z.string().min(1),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/projects' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    status: z.enum(['active', 'completed', 'planned', 'archived']),
    type: z.enum(['research', 'innovation', 'extension', 'technology', 'open-source', 'institutional', 'other']),
    role: z.string().min(1),
    start: z.coerce.date().optional(),
    year: z.number().int().optional(),
    end: z.coerce.date().optional(),
    participation: z
      .object({
        start: z.coerce.date(),
        end: z.coerce.date().optional(),
      })
      .optional(),
    areas: z.array(z.string().min(1)).default([]),
    institutions: z.array(z.string().min(1)).default([]),
    partners: z.array(z.string().min(1)).default([]),
    program: z.string().min(1).optional(),
    funding: z.array(z.string().min(1)).default([]),
    team: z
      .object({
        coordinators: z.array(z.string().min(1)).default([]),
        participants: z.array(z.string().min(1)).default([]),
      })
      .optional(),
    featured: z.boolean().default(false),
    evidenceVerified: z.boolean().default(false),
    links: z
      .object({
        project: z.url().optional(),
        repository: z.url().optional(),
        demo: z.url().optional(),
      })
      .optional(),
    sources: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.url(),
        }),
      )
      .default([]),
    related: z
      .object({
        publications: z.array(z.string()).default([]),
        talks: z.array(z.string()).default([]),
        software: z.array(z.string()).default([]),
        supervisions: z.array(z.string()).default([]),
        institutions: z.array(z.string()).default([]),
      })
      .optional(),
  }).refine((data) => data.start || data.year, 'Informe a data inicial ou o ano do projeto.'),
});

const teachingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/teaching' }),
  schema: z.object({
    title: z.string().min(1),
    course: z.string().min(1).optional(),
    institution: z.string().min(1),
    campus: z.string().min(1).optional(),
    department: z.string().min(1).optional(),
    role: z.string().min(1).optional(),
    classLevel: z.string().min(1).optional(),
    classHours: z.number().positive().optional(),
    classes: z.number().int().positive().optional(),
    semester: z.coerce.string().regex(/^\d{4}\.[12]$/, 'Use o formato AAAA.1 ou AAAA.2.'),
    status: z.enum(['current', 'planned', 'completed', 'archived']),
    areas: z.array(z.string().min(1)).default([]),
    site: z.url().optional().nullable(),
    description: z.string().optional(),
  }),
});

const supervisionCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/supervision' }),
  schema: z.object({
    title: z.string().min(1),
    students: z.array(z.string().min(1)).default([]),
    team: z.string().min(1).optional(),
    studentIds: z.array(z.string().min(1)).optional(),
    type: z.enum(['TCC', 'iniciacao-cientifica', 'projeto-tecnologico', 'mestrado', 'monitoria', 'competicao', 'outro']),
    course: z.string().min(1).optional(),
    institution: z.string().min(1),
    semester: z.coerce.string().regex(/^\d{4}\.[12]$/, 'Use o formato AAAA.1 ou AAAA.2.').optional(),
    year: z.number().int().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    status: z.enum(['current', 'planned', 'completed', 'archived']),
    project: z.string().optional(),
    publication: z.string().optional(),
    repository: z.url().optional(),
    advisor: z.string().min(1).optional(),
    role: z.enum(['Orientador', 'Coorientador']).optional(),
    defense: academicMilestone.optional(),
    qualification: academicMilestone.optional(),
    selection: z
      .object({
        term: z.coerce.string().regex(/^\d{4}\.[12]$/, 'Use o formato AAAA.1 ou AAAA.2.'),
        edital: z.string().min(1),
        researchLine: z.string().min(1),
        theme: z.string().min(1),
      })
      .optional(),
    sources: z
      .array(
        z.object({
          type: z.string().min(1),
          label: z.string().min(1),
          url: z.url(),
        }),
      )
      .default([]),
  }).refine((data) => data.students.length > 0 || data.team, 'Informe estudantes ou equipe.'),
});

export const collections = {
  projects: projectCollection,
  teaching: teachingCollection,
  supervision: supervisionCollection,
};
