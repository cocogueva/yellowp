import { test, expect, request } from '@playwright/test';

test.describe('Store API test suite', () => {
  test('Retrieve store inventory successfully', async ({ request }) => {
    const response = await request.get('/api/v3/store/inventory')
    const responseBody = await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200);
    expect(Object.keys(responseBody)).toEqual(expect.arrayContaining(['approved', 'placed', 'delivered']));
  });
  
  test('Handle empty inventory', async ({ page,request }) => {
    //First we mock data in the inventory
    await page.route('/api/v3/store/inventory', async route =>{
        const data = {
            "approved": 0,
            "placed": 0,
            "delivered": 0,
          }
          await route.fulfill({
            body: JSON.stringify(data)
          })
    })
    
    const response = await request.get('/api/v3/store/inventory')
    const responseBody = await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200);
    expect(Object.keys(responseBody)).toEqual(expect.arrayContaining(['approved', 'placed', 'delivered']));
  });
  
  test('Handle invalid order data', async ({ request }) => {
    const response = await request.post('api/v3/store/order')
    const responseBody = await response.text()
    console.log(`\n ${await responseBody}`)

    expect(responseBody).toEqual('No Order provided. Try again?');
    
  });

  test('Place a new order successfully', async ({ request }) => {
    const payload ={
        "id": 11,
        "petId": 198772,
        "quantity": 7,
        "shipDate": "2024-05-29T23:30:07.029Z",
        "status": "approved",
        "complete": true
      }

    const response = await request.post('api/v3/store/order',{data:payload})
    const responseBody = await response.json()
    console.log(`\n ${await responseBody}`)

    expect(responseBody.petId).toEqual(payload.petId)
    expect(responseBody.status).toEqual(payload.status)

    const response2 = await request.get('api/v3/store/order/11')
    const responseBody2 = await response2.json()
    console.log(`\n ${responseBody2}`)
    
    expect(response2.status()).toBe(200);
    expect(responseBody2.id).toEqual(11)
  });

  test('Delete an existing order successfully', async ({ page,request }) => {
    await page.waitForTimeout(1000)

    const response = await request.delete('api/v3/store/order/11')
    const responseBody = await response.text()
    console.log(`\n ${responseBody}`)
    
    expect(response.status()).toBe(200);

    const response2 = await request.get('api/v3/store/order/11')
    const responseBody2 = await response2.text()
    console.log(`\n ${responseBody2}`)
    
    expect(responseBody2).toEqual('Order not found');
  });

  test('Handle deleting a non-existent order', async ({ request }) => {
    const response = await request.delete('api/v3/store/order/12')
    const responseBody = await response.text()
    console.log(`\n ${responseBody}`)

    expect(responseBody).toEqual('');
    expect(response.status()).toBe(200);
  });
});



