
import './App.css';
import { BrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import UniversitiesList from './components/UniversitiesList';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <NavBar/>
   <Routes>
    <Route path='/' element={<UniversitiesList/>}/>
    <Route path='/detail/:id' element={<Details/>}/>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
