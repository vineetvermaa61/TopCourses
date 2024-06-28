import React, { useState } from 'react'
import Card from './Card'

const Cards = (props) => {
    let courses = props.courses;
    let category = props.category;
    // console.log(courses)

    // initially koi courses liked nahi hoga, array would be empty when Coards component loads 
    const[likedCourses, setLikedCourses] = useState([]);

    // json file ke andar ke key-value pair data ko ek single array mein convert kar rahe 
    // taaki map ka use karke us par iterate kar saken
    function getCourses(){
        if(category === "All"){
            let allCourses = [];
            Object.values(courses).forEach(array => {
                array.forEach(courseData => {
                    allCourses.push(courseData);
                })
            })
            return allCourses;
        }
        // allcouses is like a 2d array, aur ismein hun category wala 1d array hi return kar rahe for specific category
        else{
            return courses[category];
        }
    }

  return (
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
        {/* saare ke saare couses ke upar ek map function laga diya, aur har course ke liye ek card create kar diya */}
        {/* har ek card ko ek course ka data as a prop send kar diya */}
        {
            getCourses().map( (course) => (
                <Card key = {course.id}  course = {course} likedCourses={likedCourses} setLikedCourses = {setLikedCourses} />
            ))
        }
    </div>
  )
}

export default Cards