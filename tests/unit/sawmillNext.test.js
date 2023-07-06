import nextHandler  from '../testfunctions/next/next-function'
import { sawmill } from '../../src/next/index'

test('Sawmill-Next\'s Basic Functionality', async () => {
    const data = await nextHandler();
    expect(data).toBeDefined();
    expect(data).toMatch('Sawmill');

    // for (let i = 0; i < 10; i++) {
    //     await nextHandler();
    // }

    const average = sawmill.nextHandler.average();
    console.log('Sawmill nextHandler Average:', average, 'in a data set of', sawmill.nextHandler.length())
    expect(average).toBeLessThanOrEqual(19);
})


test('Sawmill-Next\'s Log Functionality', async () => {
    
})