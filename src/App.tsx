import { Routes,Route } from "react-router-dom"
import AuthLayout from "./_auth/auth-layout"
import { SignupForm } from "./_auth/forms/signupForm"
import { SigninForm } from "./_auth/forms/signinForm"
import RootLayout from "./_root/root-layout"
import { Home } from "./_root/pages"
{
  /* The following line can be included in your src/index.js or App.js file */
}
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <>
     <Routes>
      <Route element={<AuthLayout />} >
          <Route path="/sign-up" element={<SignupForm/>}/>
          <Route path="/sign-in" element={<SigninForm/>}/>
      </Route>
      <Route element={<RootLayout />}>
         <Route index element={<Home/>}/>
      </Route>
     </Routes>
    </>
  )
}

export default App