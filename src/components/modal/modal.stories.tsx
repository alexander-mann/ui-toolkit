import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Modal, ModalSize } from '..'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      description: 'Size of modal',
      options: Object.values(ModalSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ModalSize.default },
      },
      control: 'select',
    },
    triggerElement: {
      table: {
        disable: true,
      },
    },
    usePortal: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    exclude: ['triggerElement'],
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const BasicUsage: Story = {
  args: {},
  render: (props) => (
    <Modal
      {...props}
      usePortal
      triggerElement={
        <span className="underline hover:opacity-80">Open Modal</span>
      }
      title="Title"
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
    </Modal>
  ),
}
