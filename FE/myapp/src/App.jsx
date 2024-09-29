
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import CreateAccPage from "./Pages/CreateAccPage"
import MenuPage from "./Pages/MenuPage"
import ManageUserPage from "./Pages/Users/ManageUserPage"
import AllUserPage from "./Pages/Users/AllUserPage"
import AddUserPage from "./Pages/Users/AddUserPage"
import EditUser from "./Pages/Users/EditUser"
import MoviesPage from "./Pages/Movies/MoviesPage"
import AllMovies from "./Pages/Movies/AllMoviesPage"
import AddMoviePage from "./Pages/Movies/AddMoviePage"
import Editmovie from "./Pages/Movies/Editmovie"
import SubscriptionsPage from "./Pages/Subscriptions/SubscriptionsPage"
import AllMemberPage from "./Pages/Subscriptions/AllMemberPage"
import AddMemberPage from "./Pages/Subscriptions/AddMemberPage"
import EditMember from "./Pages/Subscriptions/EditMember"
import withAuth from "./WithAuth"

const AllUsersPageWithAuth = withAuth(AllUserPage)
const AddUsersPageWithAuth = withAuth(AddUserPage)
const EditUsersPageWithAuth = withAuth(EditUser)

const AllMoviePageWithAuth = withAuth(AllMovies)
const AddMoviePageWithAuth = withAuth(AddMoviePage)
const EditMoviePageWithAuth = withAuth(Editmovie)

const AllMemberPageWithAuth = withAuth(AllMemberPage)
const AddMemberPageWithAuth = withAuth(AddMemberPage)
const EditMemberPageWithAuth = withAuth(EditMember)

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
              <Route path="allusers" element={<AllUsersPageWithAuth />} />
              <Route path="adduser" element={<AddUsersPageWithAuth />} />
              <Route path="edituser" >
                <Route path=":id" element={<EditUsersPageWithAuth />} />
              </Route>
            </Route>

            <Route path="movies" element={<MoviesPage />}>
              <Route path="allmovies" element={<AllMoviePageWithAuth />} />
              <Route path="addmovie" element={<AddMoviePageWithAuth />} />
              <Route path="editmovie">
                <Route path=":id" element={<EditMoviePageWithAuth />} />
              </Route>
            </Route>

            <Route path="subscriptions" element={<SubscriptionsPage />} >
              <Route path="allmembers" element={<AllMemberPageWithAuth />} />
              <Route path="addmember" element={<AddMemberPageWithAuth />} />
              <Route path="editmember">
                <Route path=":id" element={<EditMemberPageWithAuth />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>


      <div style={{ border: "2px solid green", height: "140px" }}><h1 style={{ display: "flex", justifyContent: "center", color: "green" }}>Policy...</h1></div>

    </div>
  )
}

export default App
