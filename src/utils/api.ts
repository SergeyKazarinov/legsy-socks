const checkAnswer = (res: any) => {
  if(res.ok) {
    return res.json();
  }
  
  return res.json().then((err: Error) => {
    return Promise.reject(err);
  })
}

export const getQuantityApi = async (nm_id: number) => {
  try {
    const res = await fetch(`https://card.wb.ru/cards/detail?spp=0&regions=80,64,83,4,38,33,82,68,86,30,40,48,1,22,66,31&pricemarginCoeff=1.0&reg=0&appType=1&emp=0&locale=ru&lang=ru&curr=rub&couponsGeo=3,6,19,21,8&dest=-1059500,-72639,-3826848,123586076&nm=${nm_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getRowDataFromServer = async (startDate: string, endDate: string) => {
  try {
    const res = await fetch(`https://suppliers-stats.wildberries.ru/api/v1/supplier/reportDetailByPeriod?key=NDczMDBhM2ItYmEwYy00ZTIzLWFlMjItZDU4YTM4MmNlZmMw&dateFrom=${startDate}&dateTo=${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await checkAnswer(res);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// запрсоc на новый API

// export const getRowDataFromServer = async (startDate: string, endDate: string) => {
//   try {
//     const res = await fetch(`https://statistics-api.wildberries.ru/api/v1/supplier/reportDetailByPeriod?dateFrom=${startDate}&dateTo=${endDate}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6ImIwMDdiZmJhLWFmMjQtNDJkYy05ZmI5LTBiM2E1YTMzY2M5YiJ9.zBT7zjI98ra4nVck20FzJu8zq87D41m3D1JIebYZwIA',
//         'Content-Type': 'application/json',
//         'Access-Control-Request-Headers': '*'
//       }
//     });
//     const data = await checkAnswer(res);
//     return data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }