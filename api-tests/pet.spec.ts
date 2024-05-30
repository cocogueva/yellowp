import { test, expect, request } from '@playwright/test';

test.describe('Pet API test suite', () => {
  test('Should get a Pet info by Id', async ({ request }) => {
    const response = await request.get('api/v3/pet/1')
    const responseBody = await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200);
    expect(responseBody.name).toEqual('Cat 1')
    expect(responseBody.status).toEqual('available')
    for (const url of responseBody.photoUrls){
      expect(url).toContain('url')
    }
  });

  test('Should show msg if pet id does not exist', async ({ request }) => {
    const response = await request.get('api/v3/pet/11')
    const responseBody = await response.text()
    console.log(responseBody)

    expect(responseBody).toEqual('Pet not found')
    expect(response.status()).toBe(404);
  });

  test('Should be able to add and delete a pet to the store', async ({ request }) => {
    const id = 12
    const payload = {
      "id": id,
      "name": "Fido API test",
      "category": {
        "id": 1,
        "name": "Dogs"
      },
      "photoUrls": [
        "www.photo.com"
      ],
      "tags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "status": "available"
    };
    const create = await request.post('api/v3/pet',{
      data:payload
    })
    expect(await create.status()).toBe(200);

    const getPet = await request.get(`api/v3/pet/${id}`)
    console.log(await getPet.json())
    expect(await getPet.status()).toBe(200); 

    const deletion = await request.delete(`api/v3/pet/${id}`)
    console.log(`\n${await deletion.text()}`)
    expect(await deletion.text()).toEqual('Pet deleted')
    expect(await deletion.status()).toBe(200);

    const getPet2 = await request.get(`api/v3/pet/${id}`)
    console.log(`\n${await getPet2.text()}`)
    expect(await getPet2.text()).toEqual('Pet not found');
  });
  
  test('Should be able to to find pets by status', async ({ request }) => {
    const response = await request.get('api/v3/pet/findByStatus?status=sold')
    const responseBody = await response.json()
    console.log(responseBody)

    expect(responseBody.length).toEqual(1)
  });
  
});