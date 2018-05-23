import Api from './api';

it('should load user data', async () => {
    const json = await Api.getRows({page: 0, rowsPerPage: 3})
    expect(json).toBeDefined()
    expect(json.data.length).toEqual(3)
})