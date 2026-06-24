import {
  Button,
  ButtonTrailingIcon,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  Halftone,
  IconButton,
  MediaFrame,
  Section,
  Split,
  Stack,
  StatusDot,
  Sticker,
  StickerFace,
  Surface,
  Text,
  type ChipTone,
} from 'neobrutalism-ui-react';

const stageStyle = {
  ['--otw-pink' as string]: '#ff8ac7',
  backgroundColor: '#fff8e8',
  backgroundImage: `linear-gradient(to right, #eadfca 1px, transparent 1px), linear-gradient(to bottom, #eadfca 1px, transparent 1px)`,
  backgroundSize: '28px 28px',
} as const;

interface OtwSkill {
  readonly label: string;
  readonly tone: ChipTone;
}

interface OtwLink {
  readonly label: string;
  readonly icon: string;
  readonly href: string;
  readonly tone: ChipTone;
}

const profile = {
  name: 'Rahmat Ashari',
  role: 'Software Engineer',
  status: 'Open to work',
  bio: 'Building loud, accessible, and expressive React interfaces with sharp developer experience.',
  imageAlt: 'Portrait of Rahmat Ashari',
  skills: [
    { label: 'React', tone: 'pink' },
    { label: 'TypeScript', tone: 'blue' },
    { label: 'Node.js', tone: 'lavender' },
  ] satisfies OtwSkill[],
  links: [
    {
      label: 'Rahmat Ashari on GitHub',
      icon: '/open-to-work/globe-icon.png',
      href: 'https://github.com/rahmatez',
      tone: 'mint',
    },
    {
      label: 'Neo Brutalism React repository',
      icon: '/open-to-work/linkedin-icon.png',
      href: 'https://github.com/rahmatez/neo-brutalism-react',
      tone: 'lavender',
    },
    {
      label: 'Rahmat Ashari documentation site',
      icon: '/open-to-work/twitter-icon.png',
      href: 'https://github.com/rahmatez/neo-brutalism-react#readme',
      tone: 'pink',
    },
    {
      label: 'Email Rahmat Ashari',
      icon: '/open-to-work/email-icon.png',
      href: 'mailto:rahmatez@users.noreply.github.com',
      tone: 'yellow',
    },
  ] satisfies OtwLink[],
};

export function OpenToWorkCard() {
  return (
    <Cluster justify="center" padding="xl" className="w-full overflow-visible" style={stageStyle}>
      <Surface
        border="strong"
        shadow="hard"
        radius="xl"
        className="relative w-full max-w-215 [--nb-surface-bg:#fff3e0]"
      >
        <Sticker
          shape="star"
          tone="pink"
          decorative
          rotate={10}
          className="absolute -top-10 right-1.25 z-20"
        >
          <StickerFace />
        </Sticker>

        <Split ratio="1:1" gap="xl" padding="lg" collapse="sm" align="start">
          <MediaFrame
            ratio="3/4"
            tone="pink"
            border="strong"
            radius="lg"
            shadow="none"
          >
            <img src="https://github.com/rahmatez.png" alt={profile.imageAlt} />
          </MediaFrame>

          <Stack gap="none" align="start" justify="end" className="h-full">
            <Chip tone="mint" radius="md" className="font-bold uppercase">
              <StatusDot state="online" size="sm" />
              {profile.status}
            </Chip>

            <Display as="h1" size="lg" fluid className="mt-8 mb-2 uppercase">
              Rahmat<br />Ashari
            </Display>

            <Stack className="mb-6" gap="xs" align="start">
              <Text
                size="2xl"
                weight="bold"
                underline="bar"
                underlineGap="xs"
                underlineWidth="md"
                style={{ ['--nb-underline-color' as string]: 'var(--otw-pink)' }}
              >
                {profile.role}
              </Text>
            </Stack>

            <Halftone
              shape="rectangle"
              rows={3}
              columns={18}
              size={5}
              gapX={15}
              gapY={15}
              className="opacity-70"
            />
          </Stack>
        </Split>

        <Section padding="lg">
          <Stack gap="lg" align="start">
            <ChipGroup
              gap="sm"
              radius="sm"
              shadow="hard"
              transform="uppercase"
              tracking="wide"
            >
              {profile.skills.map((skill) => (
                <Chip
                  key={skill.label}
                  tone={skill.tone}
                  data-nb-typography="display"
                  style={{
                    fontFamily: 'var(--nb-font-display, var(--nb-font-sans))',
                    ['--nb-typography-font' as string]:
                      'var(--nb-font-display, var(--nb-font-sans))',
                  }}
                >
                  {skill.label}
                </Chip>
              ))}
            </ChipGroup>

            <Text size="lg" weight="medium" measure="md">
              {profile.bio}
            </Text>
          </Stack>
        </Section>

        <Section divider="top" padding="lg">
          <Split ratio="1:1" gap="lg" collapse="sm" align="center">
            <Cluster gap="sm" align="center">
              {profile.links.map((link) => (
                <IconButton
                  key={link.label}
                  shape="circle"
                  size="lg"
                  shadow="none"
                  tone={link.tone}
                  icon={link.icon}
                  aria-label={link.label}
                />
              ))}
            </Cluster>

            <Button
              tone="yellow"
              size="xl"
              radius="md"
              fullWidth
              className="sm:w-auto"
            >
              <Text size="xl" weight="black" transform="uppercase" tracking="wide">
                View Profile
              </Text>
              <ButtonTrailingIcon
                shape="circle"
                tone="inverse"
                size="md"
                icon="/open-to-work/arrow-icon.svg"
              />
            </Button>
          </Split>
        </Section>
      </Surface>
    </Cluster>
  );
}
