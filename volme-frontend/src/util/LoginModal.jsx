import React, {useState} from 'react'
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import Divider from '@mui/joy/Divider';

import "./LoginModal.css"
import {FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const steps = ['Enter your password', 'Enter your Address', 'All set'];

export const LoginModal = () => {
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
                        <TextField id="outlined-basic" label="email" variant="outlined"/>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                                label="Password"
                            />
                        </FormControl>
                        <Button type="submit">Log in</Button>
                    </Stack>
                </div>
            </form>
        </div>


        //     todo:表单要做验证 https://muhimasri.com/blogs/mui-validation/
        //     todo:样子改好看一点 -> css style
        //     todo:加上忘记密码 -> 是不是要用另一个页面？
        //     todo:加上OAuth登录选项 -> 要在后端加逻辑
        //     todo:去掉modal的边框
        //     todo:步骤栏里面一行文字太长，应该要换行
    )
}

export const SignUpModal = () => {
    const [activeStep, setActiveStep] = React.useState(1);

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
            <form
                onSubmit={(event) => {
                    alert("submitted");
                }}
            >
                <div className="input-container">
                    <Stack spacing={1}>
                        <TextField id="outlined-basic" label="email" variant="outlined" />
                        <TextField id="outlined-basic" label="password" variant="outlined" />
                        <TextField id="outlined-basic" label="confirm password" variant="outlined" />
                        <Button type="submit">sign up</Button>
                    </Stack>
                </div>
            </form>
        </div>

    )
}