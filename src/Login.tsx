import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import loginIllustration from './assets/illustration3.png'
import registerIllustration from './assets/illustration4.png'
import shaastraLogo from './assets/Shaastra_logo.png'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { Dialog, Box } from '@material-ui/core'
import { useCreateUserMutation, useLoginMutation } from './generated'
import AuthContext from './utils/context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  loginState: boolean
}

function Login(props: Props) {
  const [login, setLogin] = React.useState(false)
  const [Lemail, setLemail] = React.useState('')
  const [Lpassword, setLpassword] = React.useState('')
  const [Rname, setRname] = React.useState('')
  const [Remail, setRemail] = React.useState('')
  const [Rpassword, setRpassword] = React.useState('')
  const [Rcpassword, setRcpassword] = React.useState('')
  const [notmatch, setNotmatch] = React.useState(false)

  useEffect(() => {
    if (props.loginState === true) {
      setLogin(true)
    }
  }, [props])
  // const [Popup, setPopupDetails] = React.useState({
  //   message: "User Already Exists",
  // // });
  const { setRole } = useContext(AuthContext)
  const history = useHistory()

  const [loginMutation, { data, loading, error }] = useLoginMutation({
    onCompleted(data) {
      if (data?.login) {
        console.log(data.login)
        localStorage.setItem('id', data.login.id)
        localStorage.setItem('name', data?.login.name)
        localStorage.setItem('email', data?.login.email)
        localStorage.setItem('role', data?.login.role)
        localStorage.setItem('referral', data.login.referral)
        setRole(data?.login.role)
      }
    },
  })

  const [
    createUserMutation,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useCreateUserMutation()

  if (data) {
    history.push('/me')
    return null
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (login)
        await loginMutation({
          variables: {
            loginInput: {
              email: Lemail,
              password: Lpassword,
            },
          },
        })
      console.log('done')
      if (!login) {
        if (notmatch) {
          const closeHandler = () => {
            history.push('/login')
          }
          return (
            <Dialog onClose={closeHandler} open={true}>
              <p>Password didn't match</p>
              <button onClick={closeHandler}>Close</button>
            </Dialog>
          )
        }
        await createUserMutation({
          variables: {
            createUserInput: {
              name: Rname,
              email: Remail,
              password: Rpassword,
            },
          },
        })
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }

  if (error || createUserError) {
    if (
      error?.message.includes(
        'Could not find any entity of type "User" matching'
      )
    ) {
      const handleClose = () => {
        window.location.reload()
      }
      return (
        <Dialog onClose={handleClose} open={true}>
          <p>User not registered. Please register</p>
          <button onClick={handleClose}>Close</button>
        </Dialog>
      )
    } else if (error?.message === 'Invalid Credential') {
      const closeHandler = () => {
        window.location.reload()
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>Invalid credentials</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    } else if (error?.message === 'Oops, email not verified!') {
      const closeHandler = () => {
        history.push('/')
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>
            Please verify your account by the clicking on the verification link
            sent to your registered email
          </p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    } else if (
      createUserError?.message.includes(
        'duplicate key value violates unique constraint'
      )
    ) {
      const closeHandler = () => {
        window.location.reload()
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>User registered. Login to continue!</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    } else {
      const closeHandler = () => {
        window.location.reload()
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>Some error occurred</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    }
  }

  if (loading || createUserLoading) {
    return (
      <Dialog open={true}>
        <p>Loading...</p>
      </Dialog>
    )
  }

  if (createUserData) {
    if (createUserData.createUser) {
      const closeHandler = () => {
        history.push('/')
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>
            Verification mail has been sent to your registered mail ID. Please
            verify your mail to continue...
          </p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    } else {
      const closeHandler = () => {
        window.location.reload()
      }
      return (
        <Dialog onClose={closeHandler} open={true}>
          <p>Some error occurred</p>
          <button onClick={closeHandler}>Close</button>
        </Dialog>
      )
    }
  }

  return (
    <div className='Login'>
      <div className='Login_header'>
        <Link to='/'>
          <img src={shaastraLogo} alt='' />
        </Link>
        <Link to='/'>
          <FaAngleDoubleLeft />
          Back to Home
        </Link>
      </div>
      <div className='Login_Container'>
        <div className='imgBox'>
          <img src={loginIllustration} alt='' />
        </div>
        <form
          onSubmit={handleSubmit}
          style={
            login
              ? {
                  right: '10px',
                }
              : {
                  right: 'calc(100% - 560px)',
                }
          }
        >
          {login ? (
            <>
              <h1>LOG IN</h1>
              <input
                required
                type='email'
                placeholder='EMAIL'
                value={Lemail}
                onChange={(e) => setLemail(e.target.value)}
              />
              <input
                required
                type='password'
                placeholder='PASSWORD'
                value={Lpassword}
                onChange={(e) => setLpassword(e.target.value)}
              />
              <button type='submit'>LOGIN</button>
              {/*<p>
                Don't have an account ?{' '}
                <span onClick={() => setLogin(false)}>Register</span>
              </p>*/}
              <p>
                <Link to='/forgotpassword'>Forgot password ?</Link>
              </p>
            </>
          ) : (
            <>
              <h1>REGISTER</h1>
              <input
                required
                type='text'
                placeholder='FULL NAME'
                value={Rname}
                onChange={(e) => setRname(e.target.value)}
              />
              <input
                required
                type='email'
                placeholder='EMAIL'
                value={Remail}
                onChange={(e) => setRemail(e.target.value)}
              />
              <input
                required
                type='password'
                id='password'
                placeholder='PASSWORD'
                value={Rpassword}
                onChange={(e) => setRpassword(e.target.value)}
              />
              <input
                required
                type='password'
                id='confirm_password'
                placeholder='CONFIRM PASSWORD'
                value={Rcpassword}
                onChange={(e) => {
                  setRcpassword(e.target.value)
                  if (e.target.value === '' || e.target.value === Rpassword) {
                    setNotmatch(false)
                  } else {
                    setNotmatch(true)
                  }
                }}
                style={{
                  border: `2px solid ${notmatch ? 'crimson' : 'transparent'}`,
                }}
              />
              <button type='submit'>REGISTER</button>
              <p>
                Already have an account ?{' '}
                <span onClick={() => setLogin(true)}>Login</span>
              </p>
              <p>
                Didn't recieved verification Link ?{' '}
                <Link to='/resendverification'>Resend</Link>
              </p>
             
            </>
          )}
        </form>
        <div className='imgBox'>
          <img src={registerIllustration} alt='' />
        </div>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Login
