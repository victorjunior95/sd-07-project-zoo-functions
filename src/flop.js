function entryCalculator(entrants) {
  // seu código aqui
  const paying = { ...entrants };

  if (paying === undefined || paying === []) {
    return 0;
  }
  let total = 0;

  const { Adult, Child, Senior } = paying;
  if (Adult !== undefined) {
    total += Adult * 49.99;
  }

  if (Child !== undefined) {
    total += Child * 20.99;
  }

  if (Senior !== undefined) {
    total += Senior * 24.99;
  }

  return total;
}
