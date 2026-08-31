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
    end: z.coerce.date(),
    evidenceVerified: z.boolean(),
  })),
  committees: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    category: z.string().min(1),
    role: z.string().min(1),
    date: z.coerce.date().optional(),
    students: z.array(z.string().min(1)).default([]),
    evidenceVerified: z.boolean(),
  })).default([]),
});

export const institutional = institutionalSchema.parse(parse(institutionalYaml));
