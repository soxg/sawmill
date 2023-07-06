import handler  from '../testfunctions/next/handler'
import { sawmill } from '../../src/next/index'

test('sawmill-next', async () => {

    const data = await handler();
    expect(data).toBeDefined();
    expect(data).toMatch('Sawmill');

    const length = sawmill.handler.length();

    expect(length).toEqual(1);

})