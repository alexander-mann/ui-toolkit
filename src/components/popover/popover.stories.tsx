import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { expect, screen, userEvent, within } from '@storybook/test'
import { Settings } from 'lucide-react'

import { Button } from '../button'
import { Input } from '../input'
import { Popover, PopoverAlign, PopoverPosition, PopoverSize } from './popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    content: {
      description: 'Popover content',
      table: {
        type: { summary: 'ReactNode' },
      },
      control: 'text',
    },
    title: {
      description: 'Optional heading, labels the popover for screen readers',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    headingLevel: {
      description: 'Heading level for the title, to fit the document outline',
      options: [2, 3, 4, 5, 6],
      table: {
        type: { summary: '2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '2' },
      },
      control: 'select',
    },
    position: {
      description: 'Side of the trigger the popover is anchored to',
      options: Object.values(PopoverPosition),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom' },
      },
      control: 'select',
    },
    align: {
      description: 'Alignment along the trigger on the cross axis',
      options: Object.values(PopoverAlign),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
      },
      control: 'select',
    },
    size: {
      description: 'Width of the popover surface',
      options: Object.values(PopoverSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    offset: {
      description: 'Distance in px between trigger and popover',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
      control: 'number',
    },
    arrow: {
      description: 'Show arrow pointing to trigger',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    defaultOpen: {
      description: 'Initial open state when uncontrolled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    usePortal: {
      description: 'Render via portal to document.body',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    closeOnOutsideClick: {
      description: 'Close when clicking outside the popover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    closeOnEscape: {
      description: 'Close when pressing Escape',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Popover>

/**
 * Opens the popover so the surface itself is covered by visual regression —
 * a trigger-only snapshot would miss placement, the arrow, and the layout of
 * the content. Play functions don't autoplay in docs canvases (pinned below
 * rather than left to the default), so the docs page still renders closed.
 */
const openOnPlay =
  (triggerName: string): Story['play'] =>
  async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: triggerName }),
    )
    await expect(await screen.findByRole('dialog')).toBeVisible()
  }

const noDocsAutoplay = { docs: { autoplay: false } }

export const BasicUsage: Story = {
  args: {
    title: 'About popovers',
    content: 'Popovers hold rich, interactive content and open on click.',
  },
  render: (props) => (
    <div className="flex items-center justify-center p-24">
      <Popover {...props}>
        <Button>Open popover</Button>
      </Popover>
    </div>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <div className="flex items-center justify-center p-24">
      <Popover
        defaultOpen
        title="Shipping"
        content="Orders placed before 2pm ship the same day."
      >
        <Button variant="outline">Trigger</Button>
      </Popover>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-40 p-32">
      {Object.values(PopoverPosition).map((position) => (
        <Popover
          key={position}
          defaultOpen
          size="auto"
          position={position}
          aria-label={`Anchored ${position}`}
          content={`Anchored ${position}`}
        >
          <Button variant="outline">{position}</Button>
        </Popover>
      ))}
    </div>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-40 p-32">
      {Object.values(PopoverAlign).map((align) => (
        <Popover
          key={align}
          defaultOpen
          size="auto"
          align={align}
          aria-label={`Aligned to the ${align}`}
          content={`Aligned to the ${align}`}
        >
          <Button variant="outline">{align}</Button>
        </Popover>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-16 p-16">
      {Object.values(PopoverSize).map((size) => (
        <Popover
          key={size}
          defaultOpen
          size={size}
          position="right"
          aria-label={`The ${size} surface width`}
          content={`The ${size} surface width.`}
        >
          <Button variant="outline">{size}</Button>
        </Popover>
      ))}
    </div>
  ),
}

export const WithForm: Story = {
  parameters: noDocsAutoplay,
  play: openOnPlay('Project settings'),
  render: () => (
    <div className="flex items-center justify-center p-24">
      <Popover
        title="Rename project"
        content={
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <Input id="project-name" label="Name" defaultValue="ui-toolkit" />
            <Button size="sm" type="submit">
              Save
            </Button>
          </form>
        }
      >
        <Button size="icon" variant="ghost" aria-label="Project settings">
          <Settings size={16} />
        </Button>
      </Popover>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="flex items-center justify-center gap-4 p-24">
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          {isOpen ? 'Close' : 'Open'} from outside
        </Button>
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
          aria-label="Controlled popover"
          content="This popover's open state lives in the parent."
        >
          <Button>Target</Button>
        </Popover>
      </div>
    )
  },
}

export const InPortal: Story = {
  parameters: noDocsAutoplay,
  play: openOnPlay('Open popover'),
  render: () => (
    <div className="flex items-center justify-center p-24">
      <div className="h-24 w-64 overflow-hidden rounded-md border border-border p-4">
        <p className="mb-2 text-xs text-muted-foreground">
          This container clips its overflow.
        </p>
        <Popover
          usePortal
          aria-label="Portalled popover"
          content="Portalled popovers escape clipping ancestors."
        >
          <Button size="sm">Open popover</Button>
        </Popover>
      </div>
    </div>
  ),
}

export const NoArrow: Story = {
  parameters: noDocsAutoplay,
  play: openOnPlay('Open popover'),
  render: () => (
    <div className="flex items-center justify-center p-24">
      <Popover
        arrow={false}
        aria-label="Popover without an arrow"
        content="No arrow on this one."
      >
        <Button variant="outline">Open popover</Button>
      </Popover>
    </div>
  ),
}
