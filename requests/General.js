async function Fetch(url,method,data){
  const GeneralUrl ='https://mywebsite.com/endpoint/'
  url = GeneralUrl+ url
  return await fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    }),
  });
}