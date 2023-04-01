import { useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import { createInternship, updateInternship, resetMode } from '../../features/internship/internshipSlice'
import './form.css'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner'
import { toast } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function InternshipForm({openIntForm, setOpenIntForm}) {

  const dispatch = useDispatch();

  const { mode, selectedInternship, isError, isSuccess, message, isLoading } = useSelector((state) => state.internship)
  

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    location: '',
    stipend: '',
    url: '',
  })

  const { companyName, jobTitle, location, stipend, url } = formData

  useEffect(() => {
    if (mode === 'update' && selectedInternship) {
      setFormData({
        companyName: selectedInternship.companyName,
        jobTitle: selectedInternship.jobTitle,
        location: selectedInternship?.location,
        stipend: selectedInternship?.stipend,
        url: selectedInternship.url
      })
    } else {
      setFormData({
        companyName: '',
        jobTitle: '',
        location: '',
        stipend: '',
        url: '',
      })
    }
  },[mode])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onClose = () => {
    if (mode === 'update') {
      dispatch(resetMode())
    }
    setOpenIntForm(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (mode === 'update') {
      const data = {
        id: selectedInternship._id,
        internshipData: formData
      }
      dispatch(updateInternship(data))
        .unwrap()
        .then(() => {
          if (isError) {
            console.log(message)
            // toast.error(message)
          } else if (isSuccess) {
            toast.success('Internship Updated')
          }
        })
    } else {
      dispatch(createInternship(formData))
      .unwrap()
        .then(() => {
          if (isSuccess) {
            toast.success('Internship Created')
          } else if (isError) {
            toast.error(message)
          }
        })
    }
    setFormData({
      companyName: '',
      jobTitle: '',
      location: '',
      stipend: '',
      url: '',
    })
    onClose();
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <div>
      
        <Modal
          open={openIntForm}
          onClose={onClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div className='container'>
            <Box sx={style}>
              <section className='form'>
                <section>
                  <h3 className='internship-heading'>{mode === 'update' ? 'Update' : 'Create'} Internship</h3>
                </section>
                <form onSubmit={onSubmit}>
                  <div className='columns'>
                    <div className='column'>
                      <div className='form-group mb-pt5'>
                        <label htmlFor='companyName'>Company Name*</label>
                        <input
                          type='text'
                          className='w-20'
                          id='companyName'
                          name='companyName'
                          value={companyName}
                          required
                          placeholder='enter company name'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group mb-pt5'>
                        <label htmlFor='jobTitle'>Job Title*</label>
                        <input
                          type='text'
                          className='w-20'
                          id='jobTitle'
                          name='jobTitle'
                          value={jobTitle}
                          required
                          placeholder='enter job title'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group mb-pt5'>
                        <label htmlFor='location'>Location</label>
                        <input
                          type='text'
                          className='w-20'
                          id='location'
                          name='location'
                          value={location}
                          placeholder='enter location'
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className='column'>
                      <div className='form-group mb-pt5'>
                        <label htmlFor='stipend'>Stipend</label>
                        <input
                          type='text'
                          className='w-20'
                          id='stipend'
                          name='stipend'
                          value={stipend}
                          placeholder='enter your stipend'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group mb-pt5'>
                        <label htmlFor='url'>Url*</label>
                        <input
                          type='text'
                          className='w-20'
                          id='url'
                          name='url'
                          value={url}
                          required
                          placeholder='enter url'
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='action-button'>
                    <button
                      type='submit'
                      className='btn btn-reverse'
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='btn'
                    >
                      {mode === 'update' ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </section>
            </Box>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default InternshipForm
