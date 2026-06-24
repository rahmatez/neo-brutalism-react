import {
  Button,
  ButtonTrailingIcon,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  IconButton,
  MediaItem,
  MediaItemIcon,
  MediaItemTitle,
  Section,
  Split,
  Stack,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import {
  JobCardBookmarkIcon,
  JobCardBriefcaseIcon,
  JobCardClockIcon,
  JobCardExperienceIcon,
  JobCardHeartIcon,
  JobCardLocationIcon,
  JobCardLogoIcon,
  JobCardRemoteIcon,
  JobCardSalaryIcon,
  JobCardStarIcon,
  JobCardUrgentIcon,
} from './job-listing-card.icons';

export function JobListingCard() {
  return (
    <Cluster justify="center" padding="lg" className="block w-full overflow-visible">
      <Surface
        tone="cream"
        typography="accent"
        border="strong"
        shadow="heavy"
        radius="xl"
        className="w-full max-w-120 overflow-visible"
        style={{
          containerType: 'inline-size',
          ['--nb-font-accent' as string]:
            "'Patrick Hand', 'Comic Sans MS', 'Bradley Hand', 'Segoe Print', cursive",
        }}
        role="group"
        aria-label="Job posting"
      >
        <Section padding="lg">
          <Stack gap="lg">
            <header>
              <Split ratio="fill:auto" collapse="none" align="start" gap="md">
                <Cluster gap="md" align="start" wrap="nowrap">
                  <Surface
                    layout="center"
                    border="strong"
                    shadow="default"
                    radius="lg"
                    className="shrink-0"
                    style={{
                      width: 'clamp(3.125rem, 11.2cqw, 3.5rem)',
                      height: 'clamp(3.125rem, 11.2cqw, 3.5rem)',
                      ['--nb-surface-bg' as string]: '#0e47df',
                      ['--nb-surface-fg' as string]: '#fff',
                      ['--nb-icon-size' as string]: 'clamp(1.5rem, 5.6cqw, 1.75rem)',
                    }}
                    aria-hidden
                  >
                    <JobCardLogoIcon />
                  </Surface>

                  <Stack gap="xs">
                    <h2 className="m-0">
                      <Display size="sm" fluid weight="normal" className="block">
                        Senior Frontend
                      </Display>
                      <Display
                        size="sm"
                        fluid
                        weight="normal"
                        underline="wave"
                        className="inline-block"
                        style={{ ['--nb-underline-color' as string]: '#0e47df' }}
                      >
                        Engineer
                      </Display>
                    </h2>
                    <Text size="2xl" weight="bold" leading="none">
                      Inspectorio
                    </Text>
                  </Stack>
                </Cluster>

                <IconButton
                  type="button"
                  tone="white"
                  size="lg"
                  shape="square"
                  radius="none"
                  shadow="none"
                  style={{ ['--nb-icon-size' as string]: '1.5rem' }}
                  aria-label="Save to favorites"
                >
                  <JobCardHeartIcon />
                </IconButton>
              </Split>
            </header>

            <ChipGroup
              gap="sm"
              align="center"
              radius="none"
              shadow="none"
              style={{
                ['--nb-icon-size' as string]: '1.1rem',
                ['--nb-chip-icon-size' as string]: '1.1rem',
              }}
            >
              <Chip tone="mint" padding="lg">
                <JobCardRemoteIcon />
                Remote
              </Chip>
              <Chip tone="lavender" padding="lg">
                <JobCardBriefcaseIcon />
                Full-time
              </Chip>
              <Chip tone="yellow" padding="lg">
                <JobCardSalaryIcon />
                Negotiable
              </Chip>
              <Chip tone="blue" padding="lg">
                <JobCardExperienceIcon />
                5+ years
              </Chip>
              <Chip tone="pink" padding="lg">
                <JobCardUrgentIcon />
                Urgent
              </Chip>
            </ChipGroup>

            <Text
              weight="normal"
              leading="tight"
              measure="sm"
              style={{ fontSize: 'clamp(1.25rem, 4cqw, 1.5rem)' }}
            >
              Build delightful UI systems and scalable web experiences.
            </Text>

            <Surface
              tone="yellow"
              border="strong"
              shadow="default"
              radius="xl"
              padding="lg"
              style={{ ['--nb-surface-bg' as string]: '#fff3c4' }}
            >
              <Stack gap="md">
                <Cluster gap="md" align="center" wrap="nowrap">
                  <Surface
                    tone="yellow"
                    layout="center"
                    border="strong"
                    shadow="none"
                    radius="full"
                    style={{
                      width: '3rem',
                      height: '3rem',
                      ['--nb-icon-size' as string]: '1.5rem',
                    }}
                    aria-hidden
                  >
                    <JobCardStarIcon />
                  </Surface>
                  <Text size="3xl" weight="normal" leading="none">
                    Highlights
                  </Text>
                </Cluster>

                <Cluster
                  gap="lg"
                  align="start"
                  wrap="nowrap"
                  separator="solid"
                  className="max-[420px]:flex-col max-[420px]:[&>*+*]:border-l-0 max-[420px]:[&>*+*]:pl-0 max-[420px]:[&>*+*]:ml-0"
                >
                  {['Angular + TypeScript', 'Design system', 'International team'].map(
                    (label) => (
                      <Cluster key={label} gap="sm" align="start" wrap="nowrap" className="flex-1">
                        <span
                          aria-hidden
                          className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#0e47df]"
                        />
                        <Text size="lg" weight="normal" leading="tight">
                          {label}
                        </Text>
                      </Cluster>
                    ),
                  )}
                </Cluster>
              </Stack>
            </Surface>
          </Stack>
        </Section>

        <Section divider="top" dividerStyle="dashed" padding="lg">
          <Split ratio="fill:auto" collapse="none" align="end" gap="sm">
            <Stack
              gap="sm"
              style={{
                ['--nb-icon-size' as string]: '1rem',
                ['--nb-media-item-title-size' as string]: '1rem',
                whiteSpace: 'nowrap',
              }}
            >
              <MediaItem size="sm">
                <MediaItemIcon>
                  <JobCardLocationIcon />
                </MediaItemIcon>
                <MediaItemTitle>Ho Chi Minh City / Remote</MediaItemTitle>
              </MediaItem>
              <MediaItem size="sm">
                <MediaItemIcon>
                  <JobCardClockIcon />
                </MediaItemIcon>
                <MediaItemTitle>Posted 2 days ago</MediaItemTitle>
              </MediaItem>
            </Stack>

            <Cluster gap="md" align="center" justify="end" wrap="nowrap">
              <Button type="button" tone="yellow" radius="none">
                Apply
              </Button>
              <Button type="button" tone="pink" radius="none">
                Save
                <ButtonTrailingIcon size="sm" shape="none" tone="default" style={{ ['--nb-icon-size' as string]: '1.25rem' }}>
                  <JobCardBookmarkIcon />
                </ButtonTrailingIcon>
              </Button>
            </Cluster>
          </Split>
        </Section>
      </Surface>
    </Cluster>
  );
}
