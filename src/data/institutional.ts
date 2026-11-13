import { parse } from 'yaml';
import { z } from 'zod';
import institutionalYaml from '../public-data/institutional.yaml?raw';

const institutionalSchema = z.object({
  activities: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: z.string().min(1),
    role: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    evidenceVerified: z.boolean(),
  })),
  committees: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: z.string().min(1),
    role: z.string().min(1),
    date: z.coerce.date().optional(),
    year: z.number().int().optional(),
    semester: z.coerce.string().regex(/^\d{4}\.[12]$/).optional(),
    stage: z.enum(['qualificacao', 'defesa-final']).optional(),
    students: z.array(z.string().min(1)).default([]),
    course: z.string().min(1).optional(),
    institution: z.string().min(1).optional(),
    campus: z.string().min(1).optional(),
    committee: z.array(z.object({
      name: z.string().min(1),
      role: z.string().min(1),
      institution: z.string().min(1).optional(),
    })).default([]),
    outcome: z.string().min(1).optional(),
    evidenceVerified: z.boolean(),
  })).default([]),
});

export const institutional = institutionalSchema.parse(parse(institutionalYaml));
