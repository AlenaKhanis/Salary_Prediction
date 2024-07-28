import { useEffect, useRef, useState } from 'react';
import './App.css';
import OffCanvasMenu from './OffCanvasMenu';

const BACKEND_URL = 'http://127.0.0.1:5000';

const Predict = () => {
  const [country, setCountry] = useState<string[]>([]);
  const [education, setEducation] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [salary, setSalary] = useState<string>('');

  const countryRef = useRef<HTMLSelectElement>(null);
  const educationRef = useRef<HTMLSelectElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);

  const getTooltip = () => {
    const slider = experienceRef.current;
    if (!slider) return '0px';

    const value = (experience - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min));
    const percentage = value * 100;
    return `calc(${percentage}% + (${10}px))`; 
  };

  useEffect(() => {
    fetch(BACKEND_URL) 
    .then(response => response.json())
    .then(data => {
      setCountry(data[0]);
      setEducation(data[1]);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = () => {
    const countryValue = countryRef.current?.value || '';
    const educationValue = educationRef.current?.value || '';
    const experienceValue = experienceRef.current?.value || '0'; 

    const formData = {
        country: countryValue,
        education: educationValue,
        experience: parseFloat(experienceValue) 
    };

    fetch(`${BACKEND_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data =>setSalary('Predicted Salary: ' + data.predicted_salary))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Salary Predict</h1>
      <div>
        <select ref={countryRef} onClick={() => setSalary('')}>
          {country.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select ref={educationRef} onClick={() => setSalary('')}>
          {education.map((education, index) => (
            <option key={index} value={education}>
              {education}
            </option>
          ))}
        </select>
      </div>
      <div className="slider-container" onClick={() => setSalary('')}>
        <input
          id="experience-slider"
          type="range"
          min="0"
          max="60"
          step="1"
          value={experience}
          ref={experienceRef}
          onChange={e => setExperience(parseInt(e.target.value))}
          className="slider"
        />
        <div className="tooltip" style={{ left: getTooltip() }}>
          {experience}
        </div>
      </div>
      <button onClick={handleSubmit}>Predict</button>
      <p>{salary}</p>
    </div>
  );
};

export default Predict;
