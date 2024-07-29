import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line } from 'recharts';
import './offCanvasCss.css';

interface DataItem {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const BACKEND_URL = 'http://127.0.0.1:5000';

const DataChart: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [meanSalaryBaseCountry, setmeanSalaryBaseCountry] = useState<DataItem[]>([]);
  const [meanSalaryBaseExperience, setmeanSalaryBaseExperience] = useState<DataItem[]>([]);


  useEffect(() => {
    fetch(`${BACKEND_URL}/get_countries`)
      .then(response => response.json())
      .then(data => {

        const total = Object.values(data).reduce((sum : number, value) => {
          if (typeof value === 'number') {
            return sum + value;
          }
          return sum;
        }, 0);

        const chartData = Object.keys(data).map(key => ({
          name: key,
          value: (data[key] / total) * 100,
        }));
        setData(chartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    fetch(`${BACKEND_URL}/mean_country_salary`)
      .then(response => response.json())
      .then(data => {
        const chartData = Object.keys(data).map(key => ({
          name: key,
          value: data[key],
        }));
        setmeanSalaryBaseCountry(chartData);
      })
      .catch(error => console.error('Error fetching mean country salary:', error));
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/mean_salary_experience`)
      .then(response => response.json())
      .then(data => {
        const chartData = Object.keys(data).map(key => ({
          name: key,
          value: data[key],
        }));
        setmeanSalaryBaseExperience(chartData);
      })
      .catch(error => console.error('Error fetching mean education salary:', error));
  }, []);



  if (!data || data.length === 0) {
    return <p>Loading data...</p>;
  }


  return (
    <>
    <div>
      <h3>Stack Overflow Developer Survey 2020</h3>
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={({ name, value }: { name: string, value: number }) => `${name}: ${value.toFixed(1)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
      </PieChart>
    </div>
    <div>
    <h3>Mean Salary Based On Country</h3>
      <BarChart width={600} height={400} data={meanSalaryBaseCountry}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#4169E1" />
      </BarChart>
    </div>
    <div>
    <h3>Mean Salary Based On Experience</h3>
      <LineChart width={600} height={400} data={meanSalaryBaseExperience}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
    </>
  );
};

export default DataChart;
