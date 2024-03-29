import React from 'react'
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function BarChart({chartData,options}) {
  return (
    <div className=' w-2/4'>
      <Bar data={chartData} options={options}/>
    </div>
  )
}

export default BarChart