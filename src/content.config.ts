import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/projects' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(['active', 'completed', 'planned', 'archived']),
    type: z.enum(['research', 'innovation', 'technology', 'open-source', 'institutional', 'other']),
    role: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    participation: z
      .object({
        start: z.coerce.date(),
        end: z.coerce.date().optional(),
      })
      .optional(),
    areas: z.array(z.string().min(1)).min(1),
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
  }),
});

const teachingCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/teaching' }),
  schema: z.object({
    title: z.string().min(1),
    course: z.string().min(1),
    institution: z.string().min(1),
    semester: z.coerce.string().regex(/^\d{4}\.[12]$/, 'Use o formato AAAA.1 ou AAAA.2.'),
    status: z.enum(['current', 'planned', 'completed', 'archived']),
    areas: z.array(z.string().min(1)).min(1),
    site: z.url().optional().nullable(),
    description: z.string().optional(),
  }),
});

const supervisionCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/public-data/supervision' }),
  schema: z.object({
    title: z.string().min(1),
    students: z.array(z.string().min(1)).min(1),
    studentIds: z.array(z.string().min(1)).optional(),
    type: z.enum(['TCC', 'iniciacao-cientifica', 'projeto-tecnologico', 'mestrado', 'outro']),
    course: z.string().min(1),
    institution: z.string().min(1),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    status: z.enum(['current', 'planned', 'completed', 'archived']),
    project: z.string().optional(),
    publication: z.string().optional(),
    repository: z.url().optional(),
    advisor: z.string().min(1).optional(),
    role: z.enum(['Orientador', 'Coorientador']).optional(),
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
  }),
});

export const collections = {
  projects: projectCollection,
  teaching: teachingCollection,
  supervision: supervisionCollection,
};
