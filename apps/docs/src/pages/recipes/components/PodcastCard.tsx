import {
  Button,
  ButtonTrailingIcon,
  Callout,
  Chip,
  ChipGroup,
  Cluster,
  Display,
  Halftone,
  IconButton,
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
import { siteAsset } from '@/docs/site';

const stageStyle = {
  backgroundColor: '#fff8e8',
  backgroundImage: `linear-gradient(to right, #eadfca 1px, transparent 1px), linear-gradient(to bottom, #eadfca 1px, transparent 1px)`,
  backgroundSize: '28px 28px',
} as const;

const stats: ReadonlyArray<{ label: string; tone: ChipTone; icon: string }> = [
  { label: '45 MIN', tone: 'mint', icon: '/podcast-card/clock.svg' },
  { label: 'NEW', tone: 'lavender', icon: '/podcast-card/sparkle.svg' },
  { label: 'UX', tone: 'pink', icon: '/podcast-card/user.svg' },
];

export function PodcastCard() {
  return (
    <Cluster
      justify="center"
      padding="lg"
      className="w-full overflow-visible"
      style={stageStyle}
    >
      <div className="relative mx-auto w-full max-w-xl overflow-visible">
        <Surface
          clip
          tone="cream"
          border="strong"
          shadow="hard"
          radius="xl"
          className="relative z-10 w-full"
        >
          <Section padding="lg" className="relative z-10">
            <Stack gap="lg">
              <Cluster gap="md" align="center" justify="between">
                <Chip
                  padding="lg"
                  tone="pink"
                  radius="sm"
                  shadow="none"
                  icon="/podcast-card/microphone.svg"
                  className="uppercase font-black tracking-wide"
                >
                  Podcast
                </Chip>
              </Cluster>

              <Cluster gap="lg" align="center">
                <img
                  src={siteAsset('/podcast-card/bfm-logo.svg')}
                  alt="Build Loud FM logo"
                  className="size-20"
                />
                <Text size="3xl" weight="extrabold" underline="bar">
                  Build Loud FM
                </Text>
              </Cluster>

              <div className="relative w-fit">
                <Callout
                  tone="yellow"
                  size="lg"
                  shadow="hard"
                  radius="sm"
                  className="w-fit uppercase tracking-tight"
                >
                  EP 42
                </Callout>
              </div>

              <Display
                as="h1"
                size="xl"
                leading="display"
                underline="bar"
                underlineGap="lg"
              >
                DESIGN<br />SYSTEMS<br />THAT SCALE
              </Display>

              <ChipGroup gap="sm" radius="sm" shadow="none" transform="uppercase">
                {stats.map((stat) => (
                  <Chip
                    key={stat.label}
                    tone={stat.tone}
                    padding="lg"
                    icon={stat.icon}
                    className="text-sm font-black"
                  >
                    {stat.label}
                  </Chip>
                ))}
              </ChipGroup>

              <Split ratio="fill:auto">
                <Text size="md" weight="medium" measure="md" leading="tight">
                  Practical strategies for building design systems that grow
                  with your product.
                </Text>
                <img
                  src="/podcast-card/flight-doodle.svg"
                  alt=""
                  aria-hidden="true"
                  className="z-0 hidden h-16 w-27 sm:block"
                />
              </Split>
            </Stack>
          </Section>

          <Section divider="top" padding="lg" className="z-10">
            <Stack gap="md" className="relative z-10">
              <Cluster gap="lg" align="start">
                <img
                  src="/podcast-card/avatar.png"
                  alt="Rahmat Ashari"
                  className="size-30"
                />

                <Stack gap="sm" align="start" className="flex-1">
                  <Stack gap="xs" align="start" className="relative w-full">
                    <Text size="xl" weight="extrabold">
                      Rahmat Ashari
                    </Text>
                    <Text size="md" tone="muted">
                      Host
                    </Text>

                    <Cluster gap="sm" align="center">
                      <StatusDot state="online" />
                      <Text size="xs" weight="bold" transform="uppercase" tracking="wide">
                        On Air
                      </Text>
                    </Cluster>

                    <Halftone className="absolute right-0 bottom-0" />
                  </Stack>

                  <img
                    src="/podcast-card/timeline.png"
                    alt="Episode player — playing at 22:15 of 45:00"
                    className="w-full"
                  />
                </Stack>
              </Cluster>

              <Cluster gap="md" align="center" justify="between">
                <Button tone="lavender" size="xl" radius="md" className="flex-1">
                  <Text size="3xl" weight="black" transform="uppercase" tracking="wide">
                    Listen Now
                  </Text>
                  <ButtonTrailingIcon
                    shape="circle"
                    tone="inverse"
                    size="md"
                    icon="/podcast-card/arrow.svg"
                  />
                </Button>

                <IconButton
                  shape="square"
                  size="xl"
                  radius="md"
                  tone="background"
                  type="button"
                  aria-label="Save episode"
                  icon="/podcast-card/bookmark.svg"
                />
              </Cluster>
            </Stack>
          </Section>

          <img
            src="/podcast-card/star-burst.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-[25%] right-10 z-0 size-10.5"
          />
        </Surface>

        <Sticker
          shape="star"
          tone="lavender"
          aria-label="Happy episode sticker"
          className="absolute top-2 right-2 z-20"
          rotate={10}
        >
          <StickerFace />
        </Sticker>

        <Sticker
          shape="splat"
          tone="pink"
          decorative
          className="absolute -left-9 bottom-5 z-0"
          rotate={-12}
        />
      </div>
    </Cluster>
  );
}
