import React from 'react'
import { Navbar, Nav } from 'rsuite'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import GearIcon from '@rsuite/icons/Gear';

type NavToggleProps = {
    expand: boolean,
    onChange: React.Dispatch<React.SetStateAction<boolean>>
}
const NavToggle: React.FC<NavToggleProps> = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" style={{ marginTop: 'auto' }} className="nav-toggle">
            <Navbar.Body>
                <Nav>
                    <Nav.Menu
                        placement="topStart"
                        trigger="click"
                    >
                        <Nav.Item>Help</Nav.Item>
                        <Nav.Item>Settings</Nav.Item>
                        <Nav.Item>Sign out</Nav.Item>
                    </Nav.Menu>
                </Nav>

                <Nav pullRight>
                    <Nav.Item onClick={() => onChange(!expand)} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <ArrowLeftLineIcon /> : <ArrowRightLineIcon />}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
}

export default NavToggle