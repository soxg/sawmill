import nextHandler  from '../testfunctions/next/next-function'
import { sawmill } from '../../src/next/index'

test('Sawmill-Next\'s Basic Functionality', async () => {
    const data = await nextHandler();
    expect(data).toBeDefined();
    expect(data).toMatch('Sawmill');

    const length = sawmill.nextHandler.length();
    expect(length).toEqual(1);

})


test('Sawmill-Next\'s Log Functionality', async () => {
    
})