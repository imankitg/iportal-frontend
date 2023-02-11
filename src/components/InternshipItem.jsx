import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteInternship,
  changeMode,
  selInternship,
} from '../features/internship/internshipSlice'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import InternshipForm from './forms/InternshipForm'
import { toast } from 'react-toastify'

function InternshipItem({ internship }) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [openIntForm, setOpenIntForm] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleDelete = () => {
    dispatch(deleteInternship(internship._id))
      .unwrap()
      .then(() => {
        toast.success("Internship deleted successfully")
      })
    setOpen(false)
  }

  const editInternship = () => {
    setOpenIntForm(true)
    dispatch(selInternship(internship))
    dispatch(changeMode('update'))
  }

  return (
    <div className='internship'>
      <div>{new Date(internship.createdAt).toLocaleString('en-US')}</div>
      <h2>{internship.companyName}</h2>
      <h2>{internship.jobTitle}</h2>
      <h2>{internship.stipend}</h2>
      <h2>{internship.location}</h2>
      <a
        href={internship.url}
        target='_blank'
        rel='noreferrer noopener'
        className='btn'
      >
        Apply
      </a>
      <div className={user && user.role !== 'admin' ? 'd-none' : ''}>
        <button className='close' onClick={handleClickOpen}>
          X
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Do you want to delete this internship?'}
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <div className={user && user.role !== 'admin' ? 'd-none' : ''}>
          <InternshipForm openIntForm={openIntForm} setOpenIntForm={setOpenIntForm} />

          <button
            className='btn btn-block'
            style={{ marginTop: '0.25rem' }}
            onClick={editInternship}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default InternshipItem
