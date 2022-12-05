import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/layout';
import HomePage from './pages/home';
import AddPage from './pages/add';
import EditPage from './pages/edit';
import ErrorPage from './pages/Error';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/add' element={<AddPage />} />
          <Route path='/edit:id' element={<EditPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 