// Calculate mean
export const calculateMean = (data: number[]): string => {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return (sum / data.length).toFixed(3); 
};

// Calculate median
export const calculateMedian = (data: number[]): string => {
  const sortedData = data.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    const left = sortedData[mid - 1];
    const right = sortedData[mid];
    return ((left + right) / 2).toFixed(3); 
  } else {
    return sortedData[mid].toFixed(3); 
  }
};

// Calculate mode
export const calculateMode = (data: number[]): string => {
  const frequency: Record<string, number> = {};

  data.forEach(item => {
    const key = item.toFixed(3);
    if (frequency[key]) {
      frequency[key]++;
    } else {
      frequency[key] = 1;
    }
  });

  let mode: string | undefined;
  let maxCount = 0;

  for (const key in frequency) {
    if (frequency[key] > maxCount) {
      mode = key;
      maxCount = frequency[key];
    }
  }

  return mode ? mode : '';
};

