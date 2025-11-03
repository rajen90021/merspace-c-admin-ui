

export default function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login in</button>
      <label>
        <input type="checkbox" id="remember-me" />
        Remember Me
      </label>
      <input type="reset" value="Reset" />
      <a href='#' >Forgot Password?</a>
    
    </>
  )
}
    