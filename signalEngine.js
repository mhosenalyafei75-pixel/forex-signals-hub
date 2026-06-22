const Signal = require("./models/Signal");

// حساب RSI بسيط
function rsi(prices) {
  let gain = 0;
  let loss = 0;

  for (let i = 1; i < prices.length; i++) {
    let diff = prices[i] - prices[i - 1];
    if (diff >= 0) gain += diff;
    else loss += Math.abs(diff);
  }

  const rs = gain / (loss || 1);
  return 100 - (100 / (1 + rs));
}

// توليد الإشارة
async function generateSignal(pair, prices) {
  const value = rsi(prices);
  const last = prices[prices.length - 1];

  let signal = null;

  if (value < 30) {
    signal = {
      pair,
      type: "BUY",
      entry: last,
      tp: last + 0.0020,
      sl: last - 0.0020
    };
  }

  if (value > 70) {
    signal = {
      pair,
      type: "SELL",
      entry: last,
      tp: last - 0.0020,
      sl: last + 0.0020
    };
  }

  if (signal) {
    await Signal.create(signal);
    console.log("NEW SIGNAL:", signal);
  }
}

module.exports = { generateSignal };