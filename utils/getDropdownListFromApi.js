export default async function getDropdownListFromApi(page, apiEndpoint, keyName) {
  const [apiResponse] = await Promise.all([
    page.waitForResponse(res =>
      res.url().includes(apiEndpoint) && res.status() === 200
    ),
    page.reload()
  ]);

  const data = await apiResponse.json();

  const List = [
    // @ts-ignore
    ...new Set(
      data.data
        .filter(item => item.is_active || item.status === 'ACTIVE')
        .map(item => item[`${keyName}_name`])
      // .map(item => item[`form_unit_name`])
    )
  ];

  return { [`${keyName}List`]: List };
}

export function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}