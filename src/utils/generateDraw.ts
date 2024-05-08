function random(size: number): number {
  const numbers = Array.from({ length: size }, (_, index) => index + 1);

  const randomIndex = Math.floor(Math.random() * numbers.length);

  return numbers[randomIndex];
}

export const generateDraw = (): number[] => {
  const draw: number[] = [];

  // Base numbers
  for (let baseNumberIndex = 0; baseNumberIndex < 5; baseNumberIndex++) {
    let pickedNumber = random(50);

    while (draw.includes(pickedNumber)) {
      pickedNumber = random(50);
    }

    draw.push(pickedNumber);
  }

  draw.sort(function (a, b) {
    return a - b;
  });

  // Star numbers
  const starNumbers: number[] = [];
  for (let baseNumberIndex = 0; baseNumberIndex < 2; baseNumberIndex++) {
    let pickedNumber = random(12);

    while (starNumbers.includes(pickedNumber)) {
      pickedNumber = random(12);
    }

    starNumbers.push(pickedNumber);
  }

  starNumbers.sort(function (a, b) {
    return a - b;
  });

  draw.push(...starNumbers);
  return draw;
};
