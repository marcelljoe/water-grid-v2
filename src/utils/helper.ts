export const validateUpperCase = (request: string): string => {
  if (!request) return '';

  const splitRequest = request.split(/\W\s/g);
  const result: string[] = [];

  splitRequest.forEach(value => {
    result.push(value.charAt(0).toUpperCase() + value.slice(1));
  });

  return result.join(' ');
};

export const randString = (length: number, chars: string, frontText: string): string => {
  let result = `${frontText}`;
  const rand = (char: string) => {
    let result = ``;
    for (let i = char.length + frontText.length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  };
  const afterRand: string = frontText + rand(chars);
  for (let i = length - frontText.length; i > 0; --i) result += afterRand[Math.floor(Math.random() * afterRand.length)];
  return result;
};

export const currencyFormat = (value: number | string, separator: string, symbol: string) => {
  return (
    symbol +
    value
      .toString()
      .replace('.', ',')
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  );
};
