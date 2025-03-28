import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Trash2 } from 'lucide-react'

import { Button, Dialog, DialogSize } from '..'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    size: {
      description: 'Size of modal',
      options: Object.values(DialogSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: DialogSize.default },
      },
      control: 'select',
    },
    triggerElement: {
      table: {
        disable: true,
      },
    },
    usePortal: {
      description: 'Whether to render the modal in a portal',
      options: [true, false],
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: undefined,
    },
    open: {
      description: 'Whether to open the modal (controlled)',
      options: [true, false],
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    exclude: ['triggerElement'],
  },
}

export default meta

type Story = StoryObj<typeof Dialog>

export const BasicUsage: Story = {
  args: {
    title: 'Title',
    usePortal: true,
  },
  render: (props) => (
    <Dialog
      {...props}
      triggerElement={<a className="underline hover:opacity-80">Open Modal</a>}
    >
      <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Interdum pretium
        quisque sed primis nunc conubia. Orci nostra eros magna dui sociosqu
        etiam odio. Tristique lacus sociosqu pellentesque praesent sollicitudin.
        Duis diam cras varius mattis dapibus ut eros dictum. Orci suscipit nisi
        lacus nulla non dictumst aliquet. Viverra sem conubia libero vel vitae
        facilisis consequat ipsum aliquet. Tempor nunc dolor ad mattis nullam.
        Phasellus malesuada nunc in platea semper consequat in.
      </p>
      <p>
        Facilisis fusce sit dignissim; praesent morbi inceptos. Eleifend euismod
        sit odio; primis vitae lectus. Ac lacinia metus natoque venenatis metus
        egestas. Faucibus mus dis dictum nisl pharetra cras purus enim neque.
        Gravida ante aliquet integer; sem dignissim nascetur in consectetur. Id
        bibendum maximus orci sit, mauris sit adipiscing venenatis tincidunt.
        Accumsan mi cubilia euismod etiam; ac volutpat mus blandit adipiscing.
        Mattis ad vitae nibh torquent accumsan. Mus ultrices dictum nisi
        condimentum ut.
      </p>
      <p>
        Mattis vel taciti nec scelerisque dictumst ante dignissim semper.
        Ultrices cubilia hac pellentesque ante amet. Fusce tristique proin
        ultrices nisl quisque lectus ipsum tincidunt. Netus praesent eros nisi
        justo laoreet velit proin tristique. Ullamcorper mauris elit per,
        placerat phasellus convallis sollicitudin torquent. Sociosqu adipiscing
        aliquet class auctor magnis maecenas. Ligula blandit ligula nunc
        vulputate torquent vel velit. Velit faucibus parturient eu proin pretium
        justo.
      </p>
    </Dialog>
  ),
}

export const ActionDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog
        usePortal
        title="Delete all data"
        size="sm"
        open={open}
        onOpenChange={setOpen}
        triggerElement={
          <Button variant="destructive" className="w-80 gap-2">
            <Trash2 className="size-4" />
            Delete data {open ? 'open' : 'closed'}
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete all of your data?</p>
          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={() => setOpen(false)}
          >
            <Trash2 className="size-5" />
            Delete data
          </Button>
        </div>
      </Dialog>
    )
  },
}
