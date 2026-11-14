import { parse } from 'yaml';
import { z } from 'zod';
import siteYaml from './site.yaml?raw';
import profileYaml from '../public-data/profile.yaml?raw';

const presentationSchema = z.object({
  shortName: z.string().min(1),
  intro: z.string().min(1),
  profilePhoto: z.string().startsWith('/'),
  portraitArtistic: z.boolean().default(false),
  profileInstitutionLabel: z.string().min(1).optional(),
  profileInstitutionUrl: z.string().url(),
  homeTeachingOrder: z.array(z.string().min(1)).default([]),
  projectRoleLabels: z.record(z.string(), z.string().min(1)).default({}),
  projectListingExcluded: z.array(z.string().min(1)).default([]),
  educationAdditionalLogos: z.record(z.string(), z.array(z.string().min(1))).default({}),
  educationLogos: z.record(z.string(), z.object({
    scale: z.number().positive().max(1).default(1),
    src: z.string().startsWith('/'),
    width: z.number().positive(),
    height: z.number().positive(),
    viewport: z.tuple([z.number(), z.number(), z.number().positive(), z.number().positive()]),
    whiteArtwork: z.boolean().default(false),
  })).default({}),
  partnerLogos: z.record(z.string(), z.object({
    label: z.string().min(1),
    src: z.string().startsWith('/'),
    whiteArtwork: z.boolean().default(false),
  })).default({}),
  profileLogos: z.array(z.object({
    label: z.string().min(1),
    src: z.string().startsWith('/'),
    href: z.string().url(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    displayWidth: z.number().positive(),
    viewport: z.tuple([z.number().nonnegative(), z.number().nonnegative(), z.number().positive(), z.number().positive()]).optional(),
  })).default([]),
  mainNavigation: z.array(z.object({ label: z.string().min(1), href: z.string().startsWith('/') })),
  currentActivities: z.array(z.object({ title: z.string().min(1), description: z.string().min(1), kind: z.string().min(1), status: z.enum(['active', 'pending']) })),
});

const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().min(1),
  biography: z.string().min(1).optional(),
  affiliation: z.object({ institution: z.string().min(1), campus: z.string().min(1), since: z.number().int() }),
  appointments: z.array(z.object({
    id: z.string().min(1),
    role: z.string().min(1),
    program: z.string().min(1),
    shortName: z.string().min(1).optional(),
    institution: z.string().min(1),
    status: z.enum(['current', 'completed', 'planned']),
    researchLines: z.array(z.string().min(1)).default([]),
    url: z.string().url().optional(),
  })).default([]),
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
    portraitArtistic: presentation.portraitArtistic,
    summary: academic.summary,
    biography: academic.biography,
    affiliation: academic.affiliation,
    appointments: academic.appointments.filter((appointment) => appointment.status === 'current'),
    institutionLabel: presentation.profileInstitutionLabel ?? academic.affiliation.institution,
    laboratory: { name: laboratory.name, url: laboratory.links.instagram },
    education: academic.education,
    areas: academic.areas,
    languages: academic.languages,
    recognition: academic.recognition,
    lattesUpdatedAt: academic.lattesUpdatedAt,
  },
};

export type SiteConfig = typeof site;
