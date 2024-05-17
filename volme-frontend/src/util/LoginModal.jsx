import "./LoginModal.css"

import React, {useState} from 'react'
import { useTranslation } from 'react-i18next';

import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import Divider from '@mui/joy/Divider';
import { styled } from '@mui/joy/styles';
import {FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Link} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import organizerIcon from "../Assets/community.png";
import volunteerIcon from "../Assets/vest.png";

const steps = ['Who are you?', 'Tell us more about your details!', 'Confirm & Go!'];

const RoleButton = styled(Button)(({ selected }) => ({
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

const Step1 = ({ role, setRole, showPassword, showConfirmPassword, handleClickShowPassword, handleClickShowConfirmPassword, handleMouseDownPassword }) => (
    <>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>Who are you?</div>
        <div className="role-selection" style={{ display: 'flex', justifyContent: 'center' }}>
            <RoleButton variant="outlined" selected={role === 'volunteer'} onClick={() => setRole('volunteer')}>
                <img src={volunteerIcon} className="icon-size" alt="volunteerIcon" />
                <span>Volunteer</span>
            </RoleButton>
            <RoleButton variant="outlined" selected={role === 'organizer'} onClick={() => setRole('organizer')}>
                <img src={organizerIcon} className="icon-size" alt="organizerIcon" />
                <span>Organizer</span>
            </RoleButton>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>Set up your account</div>
        <TextField id="outlined-email" label="Email" variant="outlined" fullWidth margin="normal" />

        <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
                id="outlined-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Confirm Password"
            />
        </FormControl>
    </>
);

const Step2ForVolunteer = (
    <>
        <TextField id="outlined-volunteer-profilePicture" label="your profilePicture" variant="outlined" />

        <TextField id="outlined-volunteer-username" label="your username" variant="outlined" />
        <TextField id="outlined-volunteer-phoneNumber" label="your phoneNumber" variant="outlined" />

        <TextField id="outlined-volunteer-birthday" label="your birthday" variant="outlined" />
        <TextField id="outlined-volunteer-skills" label="your skills" variant="outlined" />
        <TextField id="outlined-volunteer-languages" label="your languages" variant="outlined" />
        <TextField id="outlined-volunteer-gender" label="your gender" variant="outlined" />
    </>
);

const Step2ForOrganizer = (
    <>  <TextField id="outlined-volunteer-profilePicture" label="your profilePicture" variant="outlined" />

        <TextField id="outlined-organizer-username" label="your organization name" variant="outlined" />
        <TextField id="outlined-organizer-phoneNumber" label="your phoneNumber" variant="outlined" />

        <TextField id="outlined-organizer-contactInfo" label="your contactInfo" variant="outlined" />
    </>
);

const Step3 = (
    <>
        <div>Type the 4-digits confirmation code we sent to your email address</div>
        <TextField id="outlined-confirmation-code" label="Confirmation code" variant="outlined" />
    </>
);

export const LoginModal = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="login-container">
            <form
                onSubmit={(event) => {
                    alert("submitted");
                }}
            >
                <div className="input-container">
                    <Stack spacing={1}>
                        <TextField id="outlined-basic" label={t('credentials.login.email')} variant="outlined"/>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">{t('credentials.login.password')}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={t('credentials.login.password')}
                            />
                        </FormControl>
                        <Button type="submit">{t('credentials.login.login')}</Button>
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


        //     todo:表单要做验证 https://muhimasri.com/blogs/mui-validation/
        //     todo:加上忘记密码 -> 是不是要用另一个页面？
        //     todo:加上OAuth登录选项 -> 要在后端加逻辑
    )
}

export const SignUpModal = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [role, setRole] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                                {activeStep <= index ? index + 1 : <Check />}
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
                <div className="input-container">
                    <Stack spacing={1}>
                        {activeStep === 0 && <Step1 
                                                role={role} 
                                                setRole={setRole} 
                                                showPassword={showPassword} 
                                                showConfirmPassword={showConfirmPassword}
                                                handleClickShowPassword={handleClickShowPassword} 
                                                handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                                                handleMouseDownPassword={handleMouseDownPassword}/>}
                        {activeStep === 1 && (role === 'volunteer' ? Step2ForVolunteer : Step2ForOrganizer)}
                        {activeStep === 2 && Step3}
                    </Stack>
                    <div className="step-buttons" style={{ display: 'flex', marginTop: '10px', justifyContent: activeStep > 0 ? 'space-between' : 'center', width: '100%' }}>
                        {activeStep == 0 && (
                            <Button onClick={handleNext} type="button" style={{ width: '100%' }}>Next</Button>
                        )}

                        {activeStep == 1 && (
                            <>
                            <Button onClick={handleBack} type="button" style={{ width: '48%' }}>Back</Button>
                            <Button type="submit" style={{ width: '48%' }}>Sign Up</Button>
                            </>
                        )}

                        {activeStep == 2 && (
                            <Button type="submit" style={{ width: '100%' }}>Confirm</Button>
                        ) }
                    </div>
                </div>
            </form>
        </div>
    );
}