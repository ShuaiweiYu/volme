import "./NavBar.css"

import {useState} from "react";
import { useTranslation } from 'react-i18next';

import {Link} from "react-router-dom";
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import {styled} from '@mui/joy/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import IconButton from '@mui/joy/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import hand from "../Assets/hand.png";

import {LoginModal, SignUpModal} from './LoginModal';


const NavBar = () => {
    const { t } = useTranslation();

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClickOpen = (state) => {
        setOpenModal(true);
        setIsLoginModal(state);
    };

    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpenModal(false);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        //     todo: 实现暗黑模式，把一些基础的css放在App.css里面，比如a的颜色装饰等等，这里只要字体大小
    };

    const BootstrapDialog = styled(Dialog)(({theme}) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (
        <div className="container">
            <div>
                <img src={hand} className="logo" alt="icon"/>
            </div>

            <div className="title">
                <h1>{t('navBar.title')}</h1>
            </div>

            <div className="nav">
                <nav>
                    <ul>
                        <li><Link to="/">{t('navBar.home')}</Link></li>
                        <li><Link to="/About">{t('navBar.about')}</Link></li>
                        <li><Link to="/Product">{t('navBar.product')}</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="identity">

                {isLoggedIn ? (
                        <div className="profile">
                            <button>
                                <AccountCircleIcon/>
                            {/*    todo: 登录后调用setsLoggedIn函数 */}
                            </button>
                        </div>)
                    : (
                        <div>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button onClick={() => handleClickOpen(true)}>{t('navBar.login')}</Button>
                                <Button onClick={() => handleClickOpen(false)}>{t('navBar.signup')}</Button>
                            </ButtonGroup>

                            <div>
                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={openModal}
                                >
                                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                        {isLoginModal ? t('navBar.login') : t('navBar.signup')}
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                        }}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                    <DialogContent>
                                        {isLoginModal ? <LoginModal/> : <SignUpModal/>}
                                    </DialogContent>
                                </BootstrapDialog>
                            </div>
                        </div>
                    )}


            </div>

            <div className="darkmode">
                <button onClick={toggleDarkMode}>
                    {isDarkMode ? <DarkModeIcon/> : <LightModeIcon/>}
                </button>
            </div>

        </div>
    )
}

export default NavBar;