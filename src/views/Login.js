import React, { PureComponent } from 'react'

import Stack from '@mui/material/Stack';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import callApi from '../api/ApiSevice'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default class Login extends PureComponent {
  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const data1 = {
        tenDangNhap: data.get('email'),
        matKhau: data.get('password'),
      };

      callApi(`api/Users/dangnhap`, "POST", data1)
        .then((res) => {
          localStorage.setItem("accessToken", res.data.data)
          callApi(`api/Users/xemthongtinnguoidung`, "GET")
            .then((res) => {
              localStorage.setItem("vaiTroId", res.data.data[0].vaiTroId)
              window.alert('Đăng nhập thành công !')
              if(localStorage.getItem("vaiTroId") == 1)window.location.replace('http://localhost:3000/#/starter')
              if(localStorage.getItem("vaiTroId") == 2)window.location.replace('http://localhost:3000/#/evaluation')
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          window.alert('Sai mật khẩu hoặc email !')
          console.log(err);
        });
    };
    return (
      // <div style={{ width: "60%", margin: "auto", background: "white", borderRadius: "5px" }}>
      //   <h3 style={{ marginRight: "5px" }}>Đăng nhập</h3>
      //   <TextField style={{ width: "100%", padding: "5px" }} id="outlined-basic" label="Tài khoản" variant="outlined" />
      //   <TextField style={{ width: "100%", padding: "5px" }} id="outlined-basic" type="password" label="Mật khẩu" variant="outlined" />
      //   <Stack spacing={2} direction="row">
      //     <Button style={{margin: "5px auto"}} variant="contained">Đăng nhập</Button>
      //   </Stack>
      // </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Tên đăng nhập"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    )
  }
}
