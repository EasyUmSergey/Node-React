import logo from './logo.svg';
import './App.css';
import {Menu} from "./components/Menu";
import {Header} from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Posts} from "./components/Posts";
import {Footer} from "./components/Footer";
import {SinglePost} from "./components/SinglePost";
import {Login} from "./components/Login";
import {AddPost} from "./components/AddPost";
import {Reg} from "./components/Reg";
import {Logout} from "./components/Logout";

function App() {
  return (
      <BrowserRouter>
          <Menu/>
          <Header title={"Главная страница"}/>
          <Routes>
              <Route path="/" element={<Posts/>}/>
              <Route path="/article/:id" element={<SinglePost/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/addPost"} element={<AddPost/>}/>
              <Route path={"/reg"} element={<Reg/>}/>
              <Route path={"/logout"} element={<Logout/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
