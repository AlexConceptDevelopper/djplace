import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Tu pourras ajouter tes futures routes ici, par exemple : */}
        {/* <Route path="/articles/:slug" element={<ArticleDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}