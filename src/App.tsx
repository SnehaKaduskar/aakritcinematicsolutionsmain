import { Routes, Route } from 'react-router-dom';
import HomeExperience from './pages/HomeExperience';
import DroneShowcase from './pages/DroneShowcase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeExperience />} />
      <Route path="/drone" element={<DroneShowcase />} />
    </Routes>
  );
}

export default App;
