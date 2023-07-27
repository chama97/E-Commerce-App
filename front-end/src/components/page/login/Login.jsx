import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./style.scss";
import AuthService from '../../../service/AuthService';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password
    };
    const resp = await AuthService.postLogin(data);

    if (resp.status === 200) {
      localStorage.setItem('token', resp.data.data);
      if(email.match('a@m.com')){
        navigate('./item');
      }else{
        navigate('./home');
      }
      
      console.log('Login successful',resp.data.data);
    } else {
      setShowErrorAlert(true);
      setErrorMessage(resp.response.data.message);
      console.log('Login failed');
      console.log("resp :" ,resp);
    }
  };

  return (
    <Fragment>
      <div className="login-container">
        <div className="box">
          <div className="box-body">
            <ValidatorForm className="form" onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <TextValidator
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    validators={['required', 'isString']}
                    errorMessages={['Email is required', 'Invalid email']}
                    className='input'
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextValidator
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    validators={['required']}
                    errorMessages={['Password is required']}
                    className='input'
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className='button'
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid style={{ textAlign: 'center' }} item>
                  <Link to="/signup">Don't have an account? Sign up</Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </div>
        {showErrorAlert && (
          <Alert style={{marginTop:"20px"}} severity="error">{errorMessage}</Alert>
        )}
      </div>
    </Fragment>

  );
};

export default Login;
