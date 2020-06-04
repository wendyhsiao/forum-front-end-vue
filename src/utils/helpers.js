import axios from 'axios'
import Swal from 'SweetAlert2'

const baseURL = 'https://forum-express-api.herokuapp.com/api'

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  Toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
