import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./Components/Loading/Loading";
import Tours from "./Components/Tours/Tours";

function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setTours(data));
    setLoading(false);
  }, []);



  const removeTour = (id) => {
    const newTours = tours?.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  if (loading) {
    return (
      <main>
        <Loading></Loading>
      </main>
    ); 
  }

  const loadData =()=>{
    setLoading(true);
         fetch("data.json")
           .then((res) => res.json())
           .then((data) => setTours(data));
      setLoading(false);
  }


    if (tours.length === 0) {
      return (
        <main>
          <div className="title">
            <h2>no tours left</h2>
            <button onClick={()=>loadData()}>Fetch Again</button>;
          </div>
        </main>
      )
    }

  return (
    <div className="" style={{ width: "40%", margin: "0 auto" }}>
      <h2 style={{ textAlign: 'center' }}>
        Total Number of Tour is : {tours.length}
      </h2>
      {tours.map((tour) => (
        <Tours key={tour.id} tour={tour} removeTour={removeTour}></Tours>
      ))}
    </div>
  );
}

export default App;
