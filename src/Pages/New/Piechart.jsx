import {Pie} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import React from 'react'

function PieChart({ChartData}) {
    const { labels, datasets } = ChartData.data;
    
  return (
    <div className=' w-2/4'>
    <Pie data={{
        labels: labels,
        datasets: datasets,
    }}
    options={ChartData.options} />
    </div>
    )
}

export default PieChart