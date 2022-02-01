import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import HomePageBoardChoiceComponent from './components/HomePageBoardChoiceComponent/HomePageBoardChoiceComponent';
import DefaultScrumBoardComponent from './components/DefaultScrumBoard/DefaultScrumBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewCardComponent from './components/AddNewCardComponent/AddNewCardComponent';
import AddNewColumnComponent from './components/AddNewColumnComponent/AddNewColumnComponent';
import CreateScrumTableComponent from './components/CreateScrumTableComponent/CreateScrumTableComponent';
import CreateToDoTableComponent from './components/CreateToDoTableComponent/CreateToDoTableComponent';
import DefaultToDoBoardComponent from './components/DefaultToDoBoardComponent/DefaultToDoBoardComponent';
import DefaultKanbanBoardComponent from './components/DefaultKanbanBoardComponent/DefaultKanbanBoardComponent';
import CreateKanbanTableComponent from './components/CreateKanbanTableComponent/CreateKanbanTableComponent';
import AuthComponent from './components/AuthComponent/AuthComponent';
import RegisterUserComponent from './components/RegisterUserComponent/RegisterUserComponent';
import ProfileUserComponent from './components/AuthComponent/ProfileUserComponent';
import RaportsComponent from './components/RaportsComponent/RaportsComponent';
import LoginComponent from './components/AuthComponent/LoginComponent';
import DefaultOwnBoardComponent from './components/DefaultOwnBoardComponent/DefaultOwnBoardComponent';
import CreateOwnTableComponent from './components/CreateOwnTableComponent/CreateOwnTableComponent';
import FileUploader from './components/FileUploadComponent/FileUploadComponent';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <LoginComponent />
      <Routes>

        <Route path="/" element={<HomePageBoardChoiceComponent/>}/>

        <Route path="/new-scrum" element={<CreateScrumTableComponent/>}/>
        <Route path="/new-todo" element={<CreateToDoTableComponent/>}/>
        <Route path="/new-kanban" element={<CreateKanbanTableComponent/>}/>
        <Route path="/new-own" element={<CreateOwnTableComponent/>}/>

        <Route path="/utworz-tablice" />

        <Route path="/table-scrum" element={<DefaultScrumBoardComponent/>}/>
        <Route path="/table-todo" element={<DefaultToDoBoardComponent/>}/>
        <Route path="/table-kanban" element={<DefaultKanbanBoardComponent/>}/>
        <Route path="/table-own" element={<DefaultOwnBoardComponent/>}/>

        <Route path="/add-new-column" element={<AddNewColumnComponent/>}/>

        <Route path="/add-new-card" element={<AddNewCardComponent/>}/>

        <Route path="/login" element={<AuthComponent/>}/>
        <Route path="/register" element={<RegisterUserComponent/>}/>
        <Route path="/profile" element={<ProfileUserComponent/>}/>

        <Route path="/raports" element={<RaportsComponent/>}/> 
        <Route path="/file" element={<FileUploader/>}/>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
