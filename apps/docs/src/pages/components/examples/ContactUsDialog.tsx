import { useRef, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Input,
  InputGroup,
  InputPrefix,
  Label,
  Select,
  SelectOption,
  Textarea,
  type DialogHandle,
} from 'neobrutalism-ui-react';
import {
  ContactEditIcon,
  ContactMailIcon,
  ContactSendIcon,
  ContactShieldIcon,
  ContactTagIcon,
  ContactUserIcon,
  ContactZigzagIcon,
} from './contact-us-dialog.icons';

interface ContactUsDialogProps {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
}

export function ContactUsDialog({
  triggerLabel = 'Get in Touch',
  triggerClassName,
  triggerStyle,
}: ContactUsDialogProps = {}) {
  const dialogRef = useRef<DialogHandle>(null);

  return (
    <>
      <Button
        type="button"
        className={triggerClassName}
        style={{ ['--nb-button-bg' as string]: 'var(--nb-yellow)', ...triggerStyle }}
        onClick={() => dialogRef.current?.open()}
      >
        {triggerLabel}
      </Button>

      <Dialog ref={dialogRef}>
        <div className="relative bg-(--nb-field-bg) px-6 pt-7 pb-5 sm:px-10 sm:pt-9 sm:pb-6">
          <DialogClose
            aria-label="Close dialog"
            className="absolute right-6 top-6 inline-flex size-11 items-center justify-center border-2 border-(--nb-border) bg-white text-xl leading-none shadow-[4px_4px_0_0_var(--nb-shadow)] sm:right-10 sm:top-9"
          >
            &times;
          </DialogClose>

          <span className="inline-block border-2 border-(--nb-border) bg-[#c4a8ff] px-4 py-1.5 font-mono text-sm font-black uppercase tracking-wider text-black shadow-[3px_3px_0_0_var(--nb-shadow)]">
            Let&apos;s Talk
          </span>

          <div className="flex">
            <div className="flex flex-col">
              <DialogTitle className="mt-4 p-0 font-mono text-3xl font-black leading-tight">
                Send us a message
              </DialogTitle>
              <DialogDescription className="mt-3 inline-block p-0 font-mono text-base font-medium text-black">
                Fill in the form below and we&apos;ll get back to you as soon as possible.
              </DialogDescription>
            </div>

            <img
              src="/showcase/contact-dialog/message.png"
              alt=""
              aria-hidden
              loading="lazy"
              className="pointer-events-none hidden h-28 w-auto select-none sm:block"
            />
          </div>
        </div>

        <DialogContent className="border-y-0 bg-white px-6 pb-6 pt-4 sm:px-10">
          <form className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid min-w-0 gap-2">
                <Label htmlFor="contact-name" className="font-mono text-base">
                  Name
                </Label>
                <InputGroup className="min-w-0">
                  <InputPrefix>
                    <ContactUserIcon className="size-5" />
                  </InputPrefix>
                  <Input id="contact-name" placeholder="Your name" className="h-12 font-mono" />
                </InputGroup>
              </div>
              <div className="grid min-w-0 gap-2">
                <Label htmlFor="contact-email" className="font-mono text-base">
                  Email
                </Label>
                <InputGroup className="min-w-0">
                  <InputPrefix>
                    <ContactMailIcon className="size-5" />
                  </InputPrefix>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    className="h-12 font-mono"
                  />
                </InputGroup>
              </div>
            </div>

            <div className="grid gap-2">
              <Label id="contact-subject-label" className="font-mono text-base">
                Subject
              </Label>
              <InputGroup>
                <InputPrefix>
                  <ContactTagIcon className="size-5" />
                </InputPrefix>
                <Select placeholder="What is this regarding?" aria-labelledby="contact-subject-label">
                  <SelectOption value="general">General Inquiry</SelectOption>
                  <SelectOption value="project">Project Proposal</SelectOption>
                  <SelectOption value="bug">Bug Report</SelectOption>
                  <SelectOption value="other">Other</SelectOption>
                </Select>
              </InputGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-message" className="font-mono text-base">
                Message
              </Label>
              <InputGroup>
                <InputPrefix align="stretch">
                  <ContactEditIcon className="size-5" />
                </InputPrefix>
                <Textarea
                  id="contact-message"
                  placeholder="Type your message here..."
                  className="min-h-30 font-mono"
                />
              </InputGroup>
            </div>
          </form>
        </DialogContent>

        <DialogActions className="flex-col items-stretch justify-between gap-4 border-t-2 border-(--nb-border) bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-(--nb-border) bg-[#c4a8ff]">
              <ContactShieldIcon className="size-5" />
            </span>
            <div className="font-mono text-[10px] leading-tight">
              <p className="font-bold">Your data is safe with us.</p>
              <p>We&apos;ll never share your info.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden h-10 w-px bg-(--nb-border) sm:block" aria-hidden />
            <span className="hidden rotate-165 sm:block" aria-hidden>
              <ContactZigzagIcon
                style={{
                  ['--contact-dialog-icon-width' as string]: '2.25rem',
                  ['--contact-dialog-icon-height' as string]: '0.875rem',
                }}
              />
            </span>
            <Button
              type="button"
              tone="background"
              style={{ ['--nb-button-bg' as string]: '#fff' }}
              className="min-w-28 font-mono"
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex min-w-36 items-center justify-center gap-2 font-mono"
              style={{
                ['--nb-button-bg' as string]: '#ffd92e',
                ['--nb-button-fg' as string]: '#000',
              }}
              onClick={() => dialogRef.current?.close()}
            >
              Send Message
              <ContactSendIcon className="size-4" />
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
