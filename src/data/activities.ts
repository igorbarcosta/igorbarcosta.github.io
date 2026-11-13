import { parse } from 'yaml';
import { z } from 'zod';
import eventsYaml from '../public-data/events.yaml?raw';
import reviewsYaml from '../public-data/reviews.yaml?raw';
import coursesYaml from '../public-data/courses.yaml?raw';
import certificationsYaml from '../public-data/certifications.yaml?raw';
import experienceYaml from '../public-data/professional-experience.yaml?raw';
import teachingYaml from '../public-data/teaching-activities.yaml?raw';

const text = z.string().min(1);
const record = z.object({ id: text, title: text, evidenceVerified: z.boolean() });
const trainingRecord = record.extend({ institution: text, category: text, date: z.coerce.date() });

export const events = z.array(record.extend({
  shortTitle: text.optional(), category: text, role: text,
  contribution: text.optional(), hours: z.number().positive().optional(),
  year: z.number().int().optional(),
  start: z.coerce.date().optional(), end: z.coerce.date().optional(), location: text.optional(),
  venue: text.optional(), organization: z.array(text).default([]),
}).refine((event) => event.start || event.year, 'Informe a data inicial ou o ano do evento.'))
  .parse(parse(eventsYaml))
  .sort((a, b) => (b.start?.getTime() ?? Date.UTC(b.year!, 0)) - (a.start?.getTime() ?? Date.UTC(a.year!, 0)));

export const reviews = z.array(record.extend({
  shortTitle: text.optional(), venueType: text, role: text, year: z.number().int(),
  date: z.coerce.date().optional(), location: text.optional(), issn: text.optional(),
})).parse(parse(reviewsYaml)).sort((a, b) => b.year - a.year || (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

export const courses = z.array(trainingRecord.extend({
  hours: z.number().positive().optional(), url: z.string().url().optional(),
  syllabus: z.array(text).default([]),
})).parse(parse(coursesYaml)).sort((a, b) => b.date.getTime() - a.date.getTime());

export const certifications = z.array(trainingRecord).parse(parse(certificationsYaml))
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const professionalExperience = z.array(record.extend({
  institution: text, category: text, role: text,
  start: z.coerce.date(), end: z.coerce.date().optional(),
})).parse(parse(experienceYaml)).sort((a, b) => b.start.getTime() - a.start.getTime());

export const teachingActivities = z.array(record.extend({
  institution: text, course: text.optional(), category: text, role: text,
  year: z.number().int(), semesters: z.array(z.string().regex(/^\d{4}\.[12]$/)).default([]),
  weeklyHours: z.number().positive().optional(),
})).parse(parse(teachingYaml)).sort((a, b) => b.year - a.year);
