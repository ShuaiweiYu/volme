import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { styled } from '@mui/joy/styles';

import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import IconButton from '@mui/joy/IconButton';

import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Link,
    FormHelperText,
    Avatar
} from '@mui/material';
import {
    SentimentSatisfiedAlt,
    Visibility,
    VisibilityOff,
    DriveFolderUpload,
    Check
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import organizerIcon from '../Assets/community.png';
import volunteerIcon from '../Assets/vest.png';

import "./LoginModal.css";
import {Divider} from "@mui/joy";

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const RoleButton = styled(Button)(({selected}) => ({
    backgroundColor: selected ? '#1976d2' : 'transparent',
    color: selected ? '#fff' : '#000',
    '&:hover': {
        backgroundColor: selected ? '#115293' : 'rgba(25, 118, 210, 0.04)',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    margin: '0 10px',
}));

const Step1 = ({
                   role,
                   setRole,
                   email,
                   setEmail,
                   password,
                   setPassword,
                   confirmPassword,
                   setConfirmPassword
               }) => {

    const {t} = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (!validateEmail(newEmail)) {
            setEmailError(t('credentials.login.invalidEmail'));
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordError(t('credentials.signUp.passwordNotMatch'));
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);

        if (password && newConfirmPassword !== password) {
            setPasswordError(t('credentials.signUp.passwordNotMatch'));
        } else {
            setPasswordError('');
        }
    };


    return (
        <>
            <div style={{textAlign: 'center', marginBottom: '10px'}}>{t('credentials.signUp.step1intro')}</div>

            <div className="role-selection" style={{display: 'flex', justifyContent: 'center'}}>
                <RoleButton variant="outlined" selected={role === 'volunteer'} onClick={() => setRole('volunteer')}>
                    <img src={volunteerIcon} className="icon-size" alt="volunteerIcon"/>
                    <span>{t('credentials.signUp.step1Volunteer')}</span>
                </RoleButton>
                <RoleButton variant="outlined" selected={role === 'organizer'} onClick={() => setRole('organizer')}>
                    <img src={organizerIcon} className="icon-size" alt="organizerIcon"/>
                    <span>{t('credentials.signUp.step1Organizer')}</span>
                </RoleButton>
            </div>

            <div style={{textAlign: 'center', marginTop: '20px'}}>{t('credentials.signUp.step1SetUp')}</div>

            <TextField
                id="outlined-email"
                label={t('credentials.signUp.step1Email')}
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                required
                margin="normal"/>

            <FormControl variant="outlined" fullWidth margin="normal" required>
                <InputLabel htmlFor="outlined-password">{t('credentials.signUp.step1Password')}</InputLabel>
                <OutlinedInput
                    id="outlined-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={t('credentials.signUp.step1Password')}
                    required
                />
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal" error={!!passwordError} required>
                <InputLabel
                    htmlFor="outlined-confirm-password">{t('credentials.signUp.step1ConfirmPassword')}
                </InputLabel>
                <OutlinedInput
                    id="outlined-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={t('credentials.signUp.step1ConfirmPassword')}
                    required
                />
                {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
            </FormControl>
        </>
    )
}

const ProfileAvatar = ({
                           profilePicture,
                           setProfilePicture
                       }) => {
    const {t} = useTranslation();

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id="upload-profile-picture"
                type="file"
                onChange={handleProfilePictureChange}
            />
            <label htmlFor="upload-profile-picture">
                <IconButton component="span">
                    <Stack alignItems="center" spacing={0}>
                        <Avatar
                            src={profilePicture}
                            alt="Profile Picture"
                            sx={{
                                width: 100,
                                height: 100,
                                margin: '5px auto',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {!profilePicture && <SentimentSatisfiedAlt fontSize="large"/>}
                        </Avatar>
                        <Stack direction="row" alignItems="center" spacing={0}>
                            <DriveFolderUpload/>
                            <span className="hint-font-size">{t('credentials.signUp.step2uploadProfile')}</span>
                        </Stack>
                    </Stack>
                </IconButton>
            </label>
        </>
    )
}

const Step2ForVolunteer = ({
                               profilePicture,
                               setProfilePicture,
                               username,
                               setUsername,
                               firstName,
                               setFirstName,
                               lastName,
                               setLastName,
                               phoneNumber,
                               setPhoneNumber,
                               birthday,
                               setBirthday
                           }) => {
    const {t} = useTranslation();

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        const phoneNumberPattern = /^[+]?[\d\s]{0,20}$/;

        if (phoneNumberPattern.test(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    };

    const FullWidthDatePicker = styled(DatePicker)(({theme}) => ({
        width: '100%',
        margin: theme.spacing(1, 0),
    }));

    return (
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
            <ProfileAvatar profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>

            <Stack spacing={2} style={{marginTop: '10px'}}>
                <TextField
                    id="outlined-volunteer-username"
                    label={t('credentials.signUp.step2VolunteerUsername')}
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    margin="normal"
                />

                <Stack direction="row" spacing={2} justifyContent="center">
                    <TextField
                        id="outlined-first-name"
                        label={t('credentials.signUp.step2VolunteerFirstName')}
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                    <TextField
                        id="outlined-last-name"
                        label={t('credentials.signUp.step2VolunteerLastName')}
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                </Stack>

                <TextField
                    id="outlined-phone-number"
                    label={t('credentials.signUp.step2PhoneNumber')}
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    margin="normal"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FullWidthDatePicker
                        label={t('credentials.signUp.step2VolunteerBirthday')}
                        value={birthday}
                        maxDate={dayjs(new Date())}
                        onChange={(newValue) => setBirthday(newValue)}
                        slots={{
                            textField: (props) => <TextField {...props} fullWidth margin="normal" required/>
                        }}
                    />
                </LocalizationProvider>
            </Stack>
        </div>
    );
};

const Step2ForOrganizer = ({
                               profilePicture,
                               setProfilePicture,
                               username,
                               setUsername,
                               phoneNumber,
                               setPhoneNumber,
                               address,
                               setAddress
                           }) => {
    const {t} = useTranslation();

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        const phoneNumberPattern = /^[+]?[\d\s]{0,20}$/;

        if (phoneNumberPattern.test(newPhoneNumber)) {
            setPhoneNumber(newPhoneNumber);
        }
    };

    return (
        <div style={{textAlign: 'center', marginBottom: '10px'}}>
            <ProfileAvatar profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>

            <Stack spacing={2} style={{marginTop: '10px'}}>
                <TextField
                    id="outlined-organizer-username"
                    label={t('credentials.signUp.step2OrganizerUsername')}
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    margin="normal"
                />

                <TextField
                    id="outlined-organizer-username"
                    label={t('credentials.signUp.step2OrganizerAddress')}
                    variant="outlined"
                    fullWidth
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    margin="normal"
                />

                <TextField
                    id="outlined-phone-number"
                    label={t('credentials.signUp.step2PhoneNumber')}
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    margin="normal"
                />
            </Stack>
        </div>
    );
};

const Step3 = ({
                   code,
                   setCode
               }) => {
    const {t} = useTranslation();
    return (
        <>
            <div>{t('credentials.signUp.step3info')}</div>
            <TextField
                id="outlined-organizer-username"
                label={t('credentials.signUp.step3label')}
                variant="outlined"
                fullWidth
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                margin="normal"
            />
        </>
    )
}

export const LoginModal = () => {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (!validateEmail(newEmail)) {
            setEmailError(t('credentials.login.invalidEmail'));
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const isFormValid = validateEmail(email) && password;

    return (
        <div className="login-container">
            <form
                onSubmit={(event) => {
                    if (isFormValid) {
                        alert('submitted');
                    }
                }}
            >
                <div className="input-container">
                    <Stack spacing={1}>
                        <TextField
                            id="outlined-basic"
                            label={t('credentials.login.email')}
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                            required
                        />

                        <FormControl variant="outlined" required>
                            <InputLabel htmlFor="outlined-adornment-password">
                                {t('credentials.login.password')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                required
                                label={t('credentials.login.password')}
                            />
                        </FormControl>

                        <Button type="submit" disabled={!isFormValid}>
                            {t('credentials.login.login')}
                        </Button>
                    </Stack>
                    <Divider style={{marginTop: "10px"}}/>
                    <div>
                        <p>
                            <span>{t('credentials.login.forget')}</span>
                            <Link href="#">
                                <span>{t('credentials.login.reset')}</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export const SignUpModal = () => {
    const {t} = useTranslation();
    const [activeStep, setActiveStep] = React.useState(0);

    // common information set up
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = React.useState('');
    const [profilePicture, setProfilePicture] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState('');

    // volunteer information set up
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthday, setBirthday] = React.useState(null);

    // organizer information setup
    const [address, setAddress] = useState('')

    const [code, setCode] = useState('')

    const isStep1Valid = validateEmail(email) && password && (password === confirmPassword) && role;
    const isStep2Valid = () => {
        if (role === 'volunteer') {
            return !!(username && firstName && lastName && birthday);
        } else {
            return !!(username && address)
        }
    }

    const steps = [t('credentials.signUp.stepInfo1'), t('credentials.signUp.stepInfo2'), t('credentials.signUp.stepInfo3')];

    const handleNext = (event) => {
        event.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        alert("submitted");
    };

    return (
        <div className="login-container">
            <Stepper sx={{width: '100%'}}>
                {steps.map((step, index) => (
                    <Step orientation="vertical"
                          key={step}
                          indicator={
                              <StepIndicator
                                  variant={activeStep <= index ? 'soft' : 'solid'}
                                  color={activeStep < index ? 'neutral' : 'primary'}
                              >
                                  {activeStep <= index ? index + 1 : <Check/>}
                              </StepIndicator>
                          }
                          sx={{
                              '&::after': {
                                  ...(activeStep > index &&
                                      index !== 2 && {bgcolor: 'primary.solidBg'}),
                              },
                          }}
                    >
                        {step}
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSubmit}>
                <Divider style={{marginTop: "10px"}}/>
                <div className="input-container">
                    <Stack spacing={1}>
                        {activeStep === 0 && <Step1
                            role={role}
                            setRole={setRole}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                        />}
                        {activeStep === 1 && (role === 'volunteer' ?
                            <Step2ForVolunteer
                                profilePicture={profilePicture}
                                setProfilePicture={setProfilePicture}
                                username={username}
                                setUsername={setUsername}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                                birthday={birthday}
                                setBirthday={setBirthday}
                            />
                            :
                            <Step2ForOrganizer
                                profilePicture={profilePicture}
                                setProfilePicture={setProfilePicture}
                                username={username}
                                setUsername={setUsername}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                                address={address}
                                setAddress={setAddress}
                            />)}
                        {activeStep === 2 && <Step3
                            code={code}
                            setCode={setCode}
                        />}
                    </Stack>
                    <div className="step-buttons" style={{
                        display: 'flex',
                        marginTop: '10px',
                        justifyContent: activeStep > 0 ? 'space-between' : 'center',
                        width: '100%'
                    }}>
                        {activeStep === 0 && (
                            <Button onClick={handleNext} type="button" disabled={!isStep1Valid} style={{width: '100%'}}>
                                {t('credentials.signUp.nextButton')}
                            </Button>
                        )}

                        {activeStep === 1 && (
                            <>
                                <Button onClick={handleBack} type="button" style={{width: '48%'}}>
                                    {t('credentials.signUp.backButton')}
                                </Button>
                                <Button type="submit" disabled={!isStep2Valid()} style={{width: '48%'}}>
                                    {t('credentials.signUp.signUpButton')}
                                </Button>
                            </>
                        )}

                        {activeStep === 2 && (
                            <Button type="submit" disabled={code === ''} style={{width: '100%'}}>
                                {t('credentials.signUp.confirmButton')}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}