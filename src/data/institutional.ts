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
});

export const institutional = institutionalSchema.parse(parse(institutionalYaml));
