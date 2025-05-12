export const getcorrelation = (X, Y) => {
  const n = Math.min(X.length, Y.length);
  const meanX = X.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const meanY = Y.slice(0, n).reduce((a, b) => a + b, 0) / n;

  const num = X.slice(0, n).reduce((sum, x, i) => sum + (x - meanX) * (Y[i] - meanY), 0);
  const denX = Math.sqrt(X.slice(0, n).reduce((sum, x) => sum + (x - meanX) ** 2, 0));
  const denY = Math.sqrt(Y.slice(0, n).reduce((sum, y) => sum + (y - meanY) ** 2, 0));

  return denX * denY === 0 ? 0 : num / (denX * denY);
};