export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('Simulated API error');
  }
};