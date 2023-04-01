import { useState, useEffect } from 'react'
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [passVisible, setPassVisible] = useState(false)

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='form-view'>
        <section className='heading'>
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login and start applying to Latest Internships</p>
          <div>
            <div className='font-light2'>Use below credentials to Login</div>
            <div className='flex-wrap'>
              <div className='font-light'>
                Admin
                <div className='font-light'>Email : admin@gmail.in</div>
                <div>
                  Password : Admin@123
                </div>
              </div>
              <div className='font-light'>
                Student(default role)
                <div>Email : test2@gmail.in</div>
                <div>
                  Password : Test2@123
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='form login-form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </div>
            <div className='form-group pass'>
              <input
                type={passVisible ? 'text' : 'password'}
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
              <i className='eye' onClick={() => setPassVisible(!passVisible)}>
                {' '}
                {passVisible ? <FaEye /> : <FaEyeSlash />}{' '}
              </i>
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login
