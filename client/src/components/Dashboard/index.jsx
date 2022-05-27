import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Sidebar from '../Sidebar';
import { studentRoutes, adminRoutes } from '../../routes';
import {  useDispatch, useSelector } from "react-redux"
import { LOGOUT, selectUser } from '../../redux/slices/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = (window.innerWidth > 600 && window.innerWidth < 750) ? 210 : 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [routes, setRoutes] = React.useState([])
    const [show, setShow] = React.useState(false)
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    
    React.useEffect(()=>{
        setRoutes(user?.role === "ADMIN" ? adminRoutes : studentRoutes )
      }, [user])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    const handleLogout = () => {
        dispatch(LOGOUT())
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {/* {show && <ProfileSnap setShow={setShow} />} */}
            <CssBaseline />

                {/* Following  is Header */}

            <AppBar
                position="fixed"
                color='white'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{width : '100%', display : 'flex', justifyContent : 'space-between'}} >
                        <Typography variant="h6" noWrap component="div">
                            {props.page}
                        </Typography>
                        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={()=>dispatch(LOGOUT())}
                    >
                        <LogoutIcon />
                    </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

                {/* Following  is SideNavbar */}

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Sidebar routes={routes} />

                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Sidebar routes={routes} />
                </Drawer>
            </Box>

                {/* Following  is Main content */}

            <Box
                component="main"
                style={{maxWidth : "100%"}}
                
                sx={{ flexGrow: 1, p: 3, color : 'secondary', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                    {props.children}
            </Box>
        </Box>
    );
}


export default Dashboard;


