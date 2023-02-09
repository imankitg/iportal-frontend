import axios from 'axios'

const API_URL = 'http://localhost:5001/api/internships/'

// Create new internship
const createInternship = async (internshipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, internshipData, config)

  return response.data
}

// Get internships
const getInternships = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Update internship
const updateInternship = async (internshipId, internshipData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + internshipId, internshipData, config)

  return response.data
}

// Delete internship
const deleteInternship = async (internshipId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + internshipId, config)

  return response.data
}

const internshipService = {
  createInternship,
  getInternships,
  updateInternship,
  deleteInternship,
}

export default internshipService
