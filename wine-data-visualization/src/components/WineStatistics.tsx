// Importing necessary modules and data
import React from 'react';
import { calculateMean, calculateMedian, calculateMode } from '../utils/statistics';
import wineData from '../wineData.json';

// Defining the structure of each wine data item
interface WineData {
  Alcohol: number;
  Flavanoids: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
}

const WineStatistics: React.FC = () => {
  // Extracting unique classes from the wine data
  const classes: number[] = [];
  for (const item of wineData) {
    if (!classes.includes(item.Alcohol)) {
      classes.push(item.Alcohol);
    }
  }

  // Function to calculate a custom property 'Gamma' for each wine data item
  const calculateGamma = (item: WineData) => {
    return (item.Ash * item.Hue) / item.Magnesium;
  };

  // Adding 'Gamma' property to each wine data item
  const wineDataWithGamma = wineData.map(item => ({
    ...item,
    Gamma: calculateGamma(item),
  }));

  // Function to get statistics for the 'Gamma' property of a specific class
  const getStatsForGamma = (cls: number) => {
    const classData = wineDataWithGamma.filter(item => item.Alcohol === cls).map(item => item.Gamma);
    const mean = calculateMean(classData);
    const median = calculateMedian(classData);
    const mode = calculateMode(classData);
    return { mean, median, mode };
  };

  // Function to get statistics for the 'Flavanoids' property of a specific class
  const getStatsForClass = (cls: number) => {
    const classData = wineData.filter(item => item.Alcohol === cls).map(item => item.Flavanoids);
    const mean = calculateMean(classData);
    const median = calculateMedian(classData);
    const mode = calculateMode(classData);
    return { mean, median, mode };
  };

  // Rendering the component
  return (
    <div>
      <h1>Wine Statistics</h1>
      <table>
        {/* Displaying data for 'Flavanoids' */}
        <thead>
          <tr>
            <th>Measure</th>
            {classes.map(cls => (
              <th key={cls}>Class {cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForClass(cls).mean}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForClass(cls).median}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForClass(cls).mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <h2>Gamma Statistics</h2>
      <table>
        {/* Displaying data for 'Gamma' */}
        <thead>
          <tr>
            <th>Measure</th>
            {classes.map(cls => (
              <th key={cls}>Class {cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForGamma(cls).mean}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForGamma(cls).median}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {classes.map(cls => (
              <td key={cls}>{getStatsForGamma(cls).mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStatistics;
