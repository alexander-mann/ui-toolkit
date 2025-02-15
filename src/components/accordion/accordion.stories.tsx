import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Accordion, Divider } from '..'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    id: {
      description: 'Unique identifier for the accordion',
      table: {
        type: { summary: 'string' },
      },
      control: false,
    },
    title: {
      description: 'Title of the accordion',
      table: {
        type: { summary: 'string | ReactNode' },
      },
      control: false,
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

export const BasicUsage: Story = {
  render: () => (
    <div className="w-[600px]">
      <Accordion
        title="What payment methods do you accept?"
        id="payment-methods"
      >
        We accept Visa, Mastercard, American Express, and PayPal. All payments
        are processed securely through our payment gateway.
      </Accordion>
      <Divider />
      <Accordion title="How long does shipping take?" id="shipping-time">
        Domestic orders typically arrive within 3-5 business days. International
        shipping can take 7-14 business days depending on the destination
        country.
      </Accordion>
      <Divider />
      <Accordion title="What is your return policy?" id="return-policy">
        We offer a 30-day return policy for all unused items in their original
        packaging. Simply contact our customer service team to initiate a
        return.
      </Accordion>
    </div>
  ),
}
