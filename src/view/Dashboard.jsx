import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import GoalForm from '../components/GoalForm'
import InternshipItem from '../components/InternshipItem'
import Spinner from '../components/Spinner'
import { getInternships } from '../features/internship/internshipSlice'
import {reset} from '../features/auth/authSlice'
import InternshipForm from '../components/forms/InternshipForm'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { internships, isLoading, isError, message } = useSelector(
    (state) => state.internship
  )

  const [openIntForm, setOpenIntForm] = useState(false)

  useEffect(() => {
    if (isError) {
      // toast.error(message)
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getInternships())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Check out these Internships</p>
      </section>

      <div className={user && user.role !== 'admin' ? 'd-none' : ''}>
        <InternshipForm openIntForm={openIntForm} setOpenIntForm={setOpenIntForm} />
        <div className='container flex-center mb-1'>
          <button className='btn' onClick={() => setOpenIntForm(true)}>
            + Add new internship
          </button>
        </div>
      </div>

       

      {/* <GoalForm /> */}

      <section className='content'>
        {internships.length > 0 ? (
          <div className='internships'>
            {internships.map((internship) => (
              <InternshipItem key={internship._id} internship={internship} />
            ))}
          </div>
        ) : (
          <h3>No Active Internship for now. Check back in few days.</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
