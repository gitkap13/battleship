const makeShip = (shipLength, x, y) => {
  const vertical = true;
  const hitCount = 0;
  const sunk = false;
  const coordinates = [];
  if (vertical === true) {
      for (let i = 0; i < shipLength; i++) {
        coordinates.push([x, y + i]);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        coordinates.push([x + i, y]);
      }
    }
  };

  return {
    shipLength,
    vertical,
    coordinates,
    hitCount,
    sunk
  };
module.exports = makeShip;
