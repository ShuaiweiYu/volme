import React, {useState} from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment, FormHelperText
} from '@mui/material';
import {useTranslation} from "react-i18next";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import {Check, Visibility, VisibilityOff} from "@mui/icons-material";
import Stepper from "@mui/joy/Stepper";
import {Divider} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import SendIcon from '@mui/icons-material/Send';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import DoneIcon from '@mui/icons-material/Done';
import {useGetUserByEmailAddressQuery} from '../features/users/usersApiSlice';
import {useCheckCodeValidityQuery, useAddNewCodeMutation, useGetCodeByIdQuery} from '../features/codes/codesApiSlice'
import CircularProgress from "@mui/material/CircularProgress";

const ForgotPassword = () => {
    const {t} = useTranslation();

    const [activeStep, setActiveStep] = React.useState(0);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPart2, setShowPart2] = useState(false);
    const [showPart3, setShowPart3] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [codeId, setCodeId] = useState("");

    const [addNewCode, { isLoading: isAddNewCodeLoading, isSuccess: isAddNewCodeSuccess, isError: isAddNewCodeError, }] = useAddNewCodeMutation();
    // const [checkCodeValidity, { isLoading: isVerifyingCode, data: codeData, error: verifyCodeError }] = useLazyCheckCodeValidityQuery();

    const steps = [t('resetPassword.stepsList1'), t('resetPassword.stepsList2'), t('resetPassword.stepsList3')]

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);

        if (password && newConfirmPassword !== password) {
            setPasswordError(t('credentials.signUp.passwordNotMatch'));
        } else {
            setPasswordError('');
        }
    };

    const handleNext = (event) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const sendCode = async () => {
        try {
            const result = await addNewCode({emailAddress: email, usage: "PASSWORDRESET"}).unwrap();
            if (result) {
                setCodeId(result)
                handleNext();
                setShowPart2(true);
            }
        } catch (error) {
            console.error('Error sending code:', error);
        }
    }

    const verifyCode = () => {
        handleNext();
        setShowPart3(true);
    }

    const changePassword = () => {
        handleNext();
        setResetSuccess(true)
    }

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('resetPassword.title')}
                </Typography>

                <Divider style={{margin: "10px 0"}}/>

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

                <div style={{marginTop: "20px"}}>
                    {t('resetPassword.emailInfo')}
                </div>

                <TextField
                    id="outlined-email"
                    label={t('resetPassword.email')}
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    required
                    margin="normal"
                    InputProps={{
                        readOnly: showPart2
                    }}
                />

                <Button
                    type="button"
                    onClick={sendCode}
                    disabled={emailError !== '' || email === '' || isAddNewCodeLoading || isAddNewCodeSuccess}
                    variant="contained"
                    fullWidth
                    endIcon={isAddNewCodeLoading ? <CircularProgress size={24} /> : <SendIcon />}
                    style={{ width: '50%' }}
                >
                    {t('resetPassword.sendCodeButton')}
                </Button>

                {isAddNewCodeError && (
                    <Typography color="error">
                        {t('resetPassword.sendCodeError')}
                    </Typography>
                )}

                {showPart2 && (
                    <>
                        <div style={{marginTop: "20px"}}>
                            {t('resetPassword.codeInfo')}
                        </div>

                        <TextField
                            id="outlined-email"
                            label={t('resetPassword.code')}
                            variant="outlined"
                            fullWidth
                            value={code}
                            onChange={event => setCode(event.target.value)}
                            error={!!codeError}
                            helperText={codeError}
                            required
                            margin="normal"
                            InputProps={{
                                readOnly: showPart3
                            }}
                        />

                        <Button
                            type="button"
                            onClick={verifyCode}
                            disabled={codeError !== '' || code === ''}
                            variant="contained"
                            fullWidth
                            endIcon={<SafetyCheckIcon />}
                            style={{width: '50%'}}
                        >
                            {t('resetPassword.confirmButton')}
                        </Button>
                    </>
                )}

                {showPart3 && (
                    <>
                        <div style={{marginTop: "20px"}}>
                            {t('resetPassword.resetInfo')}
                        </div>

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
                                inputProps={{
                                    readOnly: resetSuccess
                                }}
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
                                inputProps={{
                                    readOnly: resetSuccess
                                }}
                            />
                            {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
                        </FormControl>

                        <Button
                            type="button"
                            onClick={changePassword}
                            disabled={passwordError !== '' || password === '' || confirmPassword === ''}
                            variant="contained"
                            fullWidth
                            endIcon={<DoneIcon/>}
                            style={{width: '50%'}}
                        >
                            {t('resetPassword.confirmPassword')}
                        </Button>
                    </>
                )}


            </Box>
        </Container>
    );
};

export default ForgotPassword;
