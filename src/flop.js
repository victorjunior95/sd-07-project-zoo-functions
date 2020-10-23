const catchPrices = data.prices;
for (let i in catchPrices) {
  const increase = catchPrices[i] * (percentage / 100);
  const around = Math.round((catchPrices[i] + increase) * 100) / 100;
  catchPrices[i] = around;
}



catchPrices.forEach((i, index) => {
    const increase = i * (percentage / 100);
    const around = Math.round((i + increase) * 100) / 100;
    catchPrices[index] = around;  
  });
  