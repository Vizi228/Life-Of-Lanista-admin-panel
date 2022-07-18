import React, { forwardRef, useState } from 'react';
import { Form, InputGroup } from 'rsuite';
import VisibleIcon from '@rsuite/icons/Visible';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import { ValueType } from 'rsuite/esm/Checkbox';
import { FormControlBaseProps } from 'rsuite/esm/@types/common';

interface TextFieldProps {
    accepter?: React.ElementType<any & FormControlBaseProps<ValueType>>;
    name: string;
    type: string;
    isPassword?: boolean;
    'aria-label': string;
}

const TextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
    const { name, type, isPassword, accepter } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
        <Form.Group controlId={`${name}`} ref={ref}>
            <InputGroup style={{ width: '100%' }}>
                <Form.Control type={!isVisible ? type : 'text'} name={name} placeholder={props['aria-label']} accepter={accepter} />
                {isPassword &&
                    <InputGroup.Addon style={{ cursor: 'pointer' }} onClick={() => setIsVisible(!isVisible)}>
                        {isVisible
                            ?
                            <VisibleIcon />
                            :
                            <UnvisibleIcon />
                        }
                    </InputGroup.Addon>
                }
            </InputGroup>
        </Form.Group>
    )
});

export default TextField