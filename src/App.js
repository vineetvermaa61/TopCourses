import React from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {apiUrl, filterData} from "./data";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";



const App = () => {

  // const[courses, setCourses] = useState(null);
  // YAHIN PAR PHASOGE: Jab shuru mein array null hoga toh us par iterate karne par error dega jise handle karne ke liye 
  // spinner/loading wala code dikhana hoga
  // Agar null ki jagah empty array use karenge toh better handle hoga jismein array empty hone par kuch show nahi hoga
  const[courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // initilly category ko all par set kar diya
  const[category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      const output = await response.json();
      // output
      // ######### YAHIN PAR GALTI HOGI #########
      // Output nahi, uske andar ke data ko store karna hai, verify by json formatter
      setCourses(output.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div className="">
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter filterData = {filterData}
          category = {category} setCategory = {setCategory} />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]" >
            {/* agar loading ho rahi toh spinner/loading screen show karo nahi to cards show karo */}
          {
            loading ? (<Spinner/>) : (<Cards courses = {courses} category = {category} />)
          }
        </div>
      </div>
    </div>
  );
};

export default App;
