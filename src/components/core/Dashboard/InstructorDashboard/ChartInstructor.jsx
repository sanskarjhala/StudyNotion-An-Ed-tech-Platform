import React, { useState } from "react";
import { Chart , registerables } from "chart.js";
import {Pie} from "react-chartjs-2"


Chart.register(...registerables);

const ChartInstructor = ({courses}) => {
  const [currentChart, setCurrentChart] = useState("students");

  //function to generate random colors
  const randomColors = (numsColor) => {
    const colors = [];
    for (let i = 0; i < numsColor; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(
        Math.random() * 256
      )} , ${Math.floor(Math.random() * 256)})`;
       colors.push(color)
    }
    return colors;
  };

  //create data chart displaying student info 
  const chartDataForStudents = {
    labels:courses.map(course => course.courseName),
    dataSets : [
        {
            data: courses.map(course => course.totalStudentsEnrolled),
            backgroundColor: randomColors(courses.length)
        }
    ]
  }

  //create data for chart displaying income info
  const chartDataForIncome ={
    labels:courses.map(course => course.courseName),
    dataSets : [
        {
            data: courses.map(course => course?.totalAmountGenerated),
            backgroundColor: randomColors(courses.length)
        }
    ]
  }


  //options
  const options ={

  };


  return (<div>
    <p>Visulaize</p>
    <div>
        <button
            onClick={() => setCurrentChart("students")}
        >
            Student
        </button>
        <button
            onClick={() => setCurrentChart("income")}
        >
            Income
        </button>
    </div>
    <div>
        <Pie
            data={currentChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
    </div>
  </div>);
};

export default ChartInstructor;
