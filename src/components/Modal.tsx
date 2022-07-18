import React, { FC, useState } from 'react'
import { Button, Modal } from 'rsuite';

type ModalComponentProps = {
    title?: string,
    children?: JSX.Element | JSX.Element[],
    onClickButton?: () => void,
    name: string,
}

const ModalComponent: FC<ModalComponentProps> = ({ onClickButton, children, title, name }) => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const handleOpen = (value: any) => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    return (
        <div className="modal-container">
            <Button appearance='primary' onClick={() => handleOpen('sm')}>
                {name}
            </Button>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={() => onClickButton && onClickButton()} appearance="primary">
                        {title}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ModalComponent