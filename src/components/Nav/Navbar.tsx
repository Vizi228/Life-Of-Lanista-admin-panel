import React, { FC, useState } from 'react'
import { Sidebar, Sidenav, Nav } from 'rsuite'
import NavToggle from './NavToggle';
import GearIcon from '@rsuite/icons/Gear';
import { TbDeviceAnalytics } from 'react-icons/tb'
import ToolsIcon from '@rsuite/icons/Tools';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PeoplesIcon from '@rsuite/icons/Peoples';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const NavbarComponent: FC = () => {
    const [expand, setExpand] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="show-fake-browser sidebar-page">
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                width={expand ? 260 : 56}
                collapsible
            >

                <Sidenav.Header>
                    <div style={{
                        padding: 18,
                        fontSize: 16,
                        height: 56,
                        background: '#34c3ff',
                        color: ' #fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    }}>
                        <TbDeviceAnalytics style={{ fontSize: 20 }} />
                        <span style={{ marginLeft: 12 }}> Gladiators Game</span>
                    </div>
                </Sidenav.Header>

                <Sidenav expanded={expand} appearance="subtle">
                    <Sidenav.Body>
                        <Nav>

                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                                Dashboard
                            </Nav.Item>

                            <Nav.Item onClick={() => navigate('/profile')} eventKey="2" icon={<PeoplesIcon />}>
                                Profile
                            </Nav.Item>

                            <Nav.Menu
                                eventKey="3"
                                trigger="hover"
                                title="Advanced"
                                icon={<ToolsIcon />}
                                placement="rightStart"
                            >
                                <Nav.Item eventKey="3-1">Geo</Nav.Item>
                                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                                <Nav.Item eventKey="3-3">Brand</Nav.Item>
                                <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                                <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                            </Nav.Menu>

                            <Nav.Menu
                                eventKey="4"
                                trigger="hover"
                                title="Settings"
                                icon={<GearIcon />}
                                placement="rightStart"
                            >
                                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                                <Nav.Item eventKey="4-2">Websites</Nav.Item>
                                <Nav.Item eventKey="4-3">Channels</Nav.Item>
                                <Nav.Item eventKey="4-4">Tags</Nav.Item>
                                <Nav.Item eventKey="4-5">Versions</Nav.Item>
                            </Nav.Menu>

                        </Nav>
                    </Sidenav.Body>
                </Sidenav>

                <NavToggle expand={expand} onChange={setExpand} />
            </Sidebar>


        </div>
    );
}

export default NavbarComponent