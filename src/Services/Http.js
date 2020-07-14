import axios from 'axios'
import { BASE_API } from '../Shared/Constants/App'

const Http = axios.create({
    baseURL: BASE_API
})

export default Http
