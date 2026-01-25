import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import News from "./pages/News"
import NotFound from "./pages/NotFound"
function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
        <Routes element={<Layout />}>
         <Route path="/"element={<Layout />}/> 
         <Route path="Home"element={<Home />}/>
         <Route path="About"element={<About />}/>
         <Route path="News"element={<News />}/>
         <Route path="NotFound"element={<NotFound />}/>
        </Routes>
        </BrowserRouter>
        
      </div>
    
    </>
  )
}

export default App
