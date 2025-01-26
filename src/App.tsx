import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import CreateTrip from "./pages/CreateTrip"
import ViewTrip from "./pages/ViewTrip"


export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip/>} />
          <Route path="/trip/:tripId" element={<ViewTrip/>} />
        </Routes>
      </Router>
    </>
  )
}
