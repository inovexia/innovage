import React from 'react'
import Login from "~/components/Header/login"
import Register from "~/components/Header/register"

const LoginPage = () => {
  return (
    <>
    <section className={`login-register py-5`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <h1 className={`w-100 text-center pb-5`}>Login And Register</h1>
          </div>
        </div>
        <div className={`row`}>
        <div className={`col-12 col-md-6`}>
          <div className={`login-part`}>
            <div className={`login-reg-header`}>
              <h2>Login Here</h2>
            </div>
          <Login/>
          </div>
        </div>
        <div className={`col-12 col-md-6`}>
          <div className={`register-part`}>
          <div className={`login-reg-header`}>
              <h2>Register Here</h2>
            </div>
          <Register/>
          </div>
        </div>
        </div>
      </div>
    </section>
      
      </>
  )
}
export default LoginPage
