import { Routes,Route } from "react-router-dom"
import AuthLayout from "./_auth/auth-layout"
import { SignupForm } from "./_auth/forms/signupForm"
import { SigninForm } from "./_auth/forms/signinForm"
import RootLayout from "./_root/root-layout"
import { Home } from "./_root/pages"
import { Toaster } from "@/components/ui/sonner"
import { Saved } from "./_root/pages/saved"
import {AllUsers} from "./_root/pages/all-users"
import { CreatePost } from "./_root/pages/create-post"
import { EditPost } from "./_root/pages/edit-post"
import { UpdateProfile } from "./_root/pages/update-profile"
import { Profile } from "./_root/pages/profile"
import { PostDetails } from "./_root/pages/post-details"
import { Explore } from "./_root/pages/explore"
{
  /* The following line can be included in your src/index.js or App.js file */
}
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <main className=" flex h-screen">
     <Routes>
      <Route element={<AuthLayout />} >
          <Route path="/sign-up" element={<SignupForm/>}/>
          <Route path="/sign-in" element={<SigninForm/>}/>
      </Route>
      <Route element={<RootLayout />}>
         <Route index element={<Home/>}/>
         <Route path="/explore" element={<Explore />}/>
         <Route path="/saved" element={<Saved />}/>
         <Route path="/all-users" element={<AllUsers />}/>
         <Route path="/create-post" element={<CreatePost />}/>
         <Route path="/update-post/:id" element={<EditPost />}/>
         <Route path="/posts/:id" element={<PostDetails />}/>
         <Route path="/profile/:id" element={<Profile />}/>
         <Route path="/update-profile/:id" element={<UpdateProfile />}/>
      </Route>
     </Routes>
     <Toaster />
    </main>
  )
}

export default App
