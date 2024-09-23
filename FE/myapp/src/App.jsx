
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CreateAccPage from "./Pages/CreateAccPage"
import MenuPage from "./Pages/MenuPage"
import UserPage from "./Pages/Users/UserPage"
import SubscriptionsPage from "./Pages/SubscriptionsPage"
import AddUserPage from "./Pages/Users/AddUserPage"
import ManageUserPage from "./Pages/Users/ManageUserPage"
import EditUser from "./Pages/Users/EditUser"
import MoviesPage from "./Pages/Movies/MoviesPage"
import AllMovies from "./Pages/Movies/AllMoviesPage"
import AddMoviePage from "./Pages/Movies/AddMoviePage"
import Editmovie from "./Pages/Movies/Editmovie"



function App() {


  return (
    <div style={{ border: "4px solid black" }}>

      <h1 style={{ display: "flex", justifyContent: "center", paddingRight: "200px", fontSize: '50px' }}>Movies - Subscriptions Web Site</h1>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/createAccount" element={<CreateAccPage />} />
          <Route path="/menu" element={<MenuPage />}>

            <Route path="users" element={<ManageUserPage />}>
              <Route path="allusers" element={<UserPage />} />
              <Route path="adduser" element={<AddUserPage />} />
              <Route path="edituser" >
                <Route path=":id" element={<EditUser />} />
              </Route>
            </Route>

            <Route path="movies" element={<MoviesPage />}>
              <Route path="allmovies" element={<AllMovies />} />
              <Route path="addmovie" element={<AddMoviePage />} />
              <Route path="editmovie">
                <Route path=":id" element={<Editmovie />} />
              </Route>
            </Route>

            <Route path="subscriptions" element={<SubscriptionsPage />} />
          </Route>
        </Routes>
      </Router>

      <br /> <br /> <br /><br /> <br /> <br /> <br /><br /> <br /> <br /> <br /><br />
      <div style={{ border: "2px solid green", height: "140px" }}><h1 style={{ display: "flex", justifyContent: "center", color: "green" }}>Policy...</h1></div>

    </div>
  )
}

export default App
