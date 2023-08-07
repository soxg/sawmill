import wrappedHandler from '../testfunctions/next/next-function';
import sawmill from '../../src/utils/sawmill'
// A mock for the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ some: 'data' }),
  })
);

test('Sawmill\'s Basic Functionality', async () => {
  // Mock request and response objects
  const req = {}; // Customize as needed
  const res = {}; // Customize as needed

  // Call the wrapped handler, which is the combination of nextHandler and sawmill
  await wrappedHandler(req, res);

  // Since the handler name might not be directly accessible, you can check the result of your sawmill.stats object if needed
  // For example:
  console.log(sawmill.stats['nextHandler'].average());
});



test('Sawmill-Next\'s Log Functionality', async () => {
    
})