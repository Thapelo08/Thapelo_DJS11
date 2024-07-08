import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser } from "../../../api"


export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: ""})
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()


    function handleSubmit(e) {
        e.preventDefault()
        setStatus("pending")
        loginUser(loginFormData)
           .then(data => {
            setError(null)
            localStorage.setItem("loggedin", true)
            navigate(from, { replace: true })
           })
           .catch(err => {
            setError(err)
           })
           .finally(() => {
            setStatus("idle")
           })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
           ...prev,
           [name] : value
        }))
    }

    