import {
  Button,
  ButtonTrailingIcon,
  Callout,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  Icon,
  MediaFrame,
  MediaItem,
  MediaItemTitle,
  Section,
  Split,
  Stack,
  Sticker,
  Surface,
  Text,
} from 'neobrutalism-ui-react';
import { siteAsset } from '@/docs/site';

const stageStyle = {
  backgroundColor: '#fff8e8',
  backgroundImage: `linear-gradient(to right, #eadfca 1px, transparent 1px), linear-gradient(to bottom, #eadfca 1px, transparent 1px)`,
  backgroundSize: '28px 28px',
} as const;

export function TravelCard() {
  return (
    <Cluster justify="center" padding="xl" className="w-full overflow-visible" style={stageStyle}>
      <Surface
        clip
        tone="cream"
        border="strong"
        shadow="hard"
        radius="xl"
        className="relative w-full"
      >
        <div className="relative">
          <Sticker
            shape="burst"
            tone="mint"
            rotate={-12}
            aria-label="4 days, 3 nights"
            className="absolute top-2 left-2 z-20"
          >
            4D<br />/ 3N
          </Sticker>

          <MediaFrame ratio="21/9" radius="none" shadow="none" border="none">
            <img
              src="/tokyo-city-escape/hero-illustration.png"
              alt="Illustrated Tokyo"
            />
          </MediaFrame>
        </div>

        <Split ratio="2:1" gap="2xl" padding="lg" collapse="md" separator="solid">
          <Stack gap="lg">
            <Cluster gap="md" align="center">
              <img
                src={siteAsset('/tokyo-city-escape/roam-go-logo.svg')}
                alt="Roam & Go logo"
                className="w-16"
              />
              <Text
                size="xl"
                weight="extrabold"
                underline="bar"
                underlineGap="none"
                underlineWidth="sm"
              >
                Roam &amp; Go
              </Text>
            </Cluster>

            <Display as="h1" className="m-0 uppercase">
              Tokyo<br />City Escape
            </Display>

            <Text size="md" weight="medium" tone="muted" measure="md">
              Explore iconic neighborhoods, savor local flavors, and make
              unforgettable memories.
            </Text>
          </Stack>

          <Stack gap="lg" align="start" className="shrink-0">
            <ChipGroup
              direction="vertical"
              gap="sm"
              align="start"
              radius="sm"
              shadow="none"
              transform="uppercase"
              tracking="wide"
            >
              <Chip tone="mint">
                <Icon src="/tokyo-city-escape/nb-plane-fill.svg" size="sm" decorative />
                Flight included
              </Chip>
              <Chip tone="lavender">
                <Icon src="/tokyo-city-escape/nb-hotel-fill.svg" size="sm" decorative />
                Hotel
              </Chip>
              <Chip tone="pink">
                <Icon src="/tokyo-city-escape/nb-star-fill.svg" size="sm" decorative />
                Top pick
              </Chip>
            </ChipGroup>

            <Callout tone="yellow" radius="sm" size="xl" shadow="hard">
              $799
            </Callout>
          </Stack>
        </Split>

        <Section divider="top" padding="lg">
          <Split ratio="2:1" gap="lg" collapse="md" align="center">
            <Cluster
              gap="lg"
              align="center"
              justify="between"
              separator="dashed"
              wrap="nowrap"
              className="w-full min-w-0 **:data-nb-media-item:shrink-0"
            >
              <MediaItem size="xs" icon="/tokyo-city-escape/central-locations.png">
                <MediaItemTitle>
                  Central<br />Locations
                </MediaItemTitle>
              </MediaItem>
              <MediaItem size="xs" icon="/tokyo-city-escape/guided-experiences.png">
                <MediaItemTitle>
                  Guided<br />Experiences
                </MediaItemTitle>
              </MediaItem>
              <MediaItem size="xs" icon="/tokyo-city-escape/24-7-support.png">
                <MediaItemTitle>
                  24/7<br />Support
                </MediaItemTitle>
              </MediaItem>
            </Cluster>

            <Button tone="lavender" size="xl" radius="md" className="shrink-0">
              <Text size="xl" weight="black" transform="uppercase" tracking="wide">
                Book Trip
              </Text>
              <ButtonTrailingIcon shape="circle" tone="inverse" size="md">
                <Icon src="/tokyo-city-escape/nb-arrow-right.svg" size="sm" decorative />
              </ButtonTrailingIcon>
            </Button>
          </Split>
        </Section>
      </Surface>
    </Cluster>
  );
}
