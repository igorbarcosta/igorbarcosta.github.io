import { parse } from 'yaml';
import { z } from 'zod';
import siteYaml from './site.yaml?raw';
import profileYaml from '../public-data/profile.yaml?raw';

const presentationSchema = z.object({
  shortName: z.string().min(1),
  intro: z.string().min(1),
  profilePhoto: z.string().startsWith('/'),
  mainNavigation: z.array(z.object({ label: z.string().min(1), href: z.string().startsWith('/') })),
  currentActivities: z.array(z.object({ title: z.string().min(1), description: z.string().min(1), kind: z.string().min(1), status: z.enum(['active', 'pending']) })),
});

const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().min(1),
  affiliation: z.object({ institution: z.string().min(1), campus: z.string().min(1), since: z.number().int() }),
  education: z.array(z.object({ id: z.string().min(1), degree: z.string().min(1), institution: z.string().min(1), period: z.string().min(1), detail: z.string().optional() })),
  areas: z.array(z.string().min(1)),
  groups: z.array(z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    type: z.string().min(1),
    links: z.record(z.string(), z.string().url()),
  })),
  languages: z.array(z.object({ language: z.string().min(1), level: z.string().min(1) })),
  recognition: z.array(z.object({ year: z.number().int(), title: z.string().min(1) })),
  links: z.object({
    lattes: z.string().url(),
    github: z.string().url(),
    orcid: z.string().url(),
    linkedin: z.string().url(),
    email: z.string().startsWith('mailto:'),
  }),
  lattesUpdatedAt: z.coerce.date(),
});

const presentation = presentationSchema.parse(parse(siteYaml));
const academic = profileSchema.parse(parse(profileYaml));
const laboratory = academic.groups[0];

export const site = {
  ...presentation,
  name: academic.name,
  role: academic.headline,
  description: academic.description,
  socialLinks: [
    { label: 'Lattes', href: academic.links.lattes, status: 'ready' as const },
    { label: 'GitHub', href: academic.links.github, status: 'ready' as const },
    { label: 'ORCID', href: academic.links.orcid, status: 'ready' as const },
    { label: 'LinkedIn', href: academic.links.linkedin, status: 'ready' as const },
    { label: 'E-mail', href: academic.links.email, status: 'ready' as const },
  ],
  profile: {
    photo: presentation.profilePhoto,
    summary: academic.summary,
    affiliation: academic.affiliation,
    laboratory: { name: laboratory.name, url: laboratory.links.instagram },
    education: academic.education,
    areas: academic.areas,
    languages: academic.languages,
    recognition: academic.recognition,
    lattesUpdatedAt: academic.lattesUpdatedAt,
  },
};

export type SiteConfig = typeof site;
