import axios from "axios";

export default function setAuthorizationToken(token:string) {
  if (token) {
    console.log('token!!!!', token)
    axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}