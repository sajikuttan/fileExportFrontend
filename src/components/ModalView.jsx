import React from 'react'
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Modal,
} from 'semantic-ui-react';
import ChartData from './ChartData';

function ModalView() {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>View Chart</Button>}
        >
            <ModalHeader>Chart</ModalHeader>
            <ModalContent>
                <ModalDescription>
                    <ChartData />
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </ModalActions>
        </Modal>
    )
}

export default ModalView