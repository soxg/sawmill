import nextHandler  from '../testfunctions/next/next-function'
import { sawmill } from '../../src/next/index'

test('Sawmill\'s Basic Functionality', async () => {
    const data = await nextHandler();
    expect(data).toBeDefined();
    expect(data).toMatch('Sawmill');

    const average = sawmill.nextHandler.average();
    expect(average).toBeLessThanOrEqual(19);
})


test('Sawmill-Next\'s Log Functionality', async () => {
    
})