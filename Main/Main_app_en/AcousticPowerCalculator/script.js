document.getElementById('calculateBtn').addEventListener('click', function() {
  const level = parseFloat(document.getElementById('level').value);
  const area = parseFloat(document.getElementById('area').value);

  if (!isNaN(level) && !isNaN(area) && area > 0) {
    const power = Math.pow(10, level / 10) * area;
    document.getElementById('result').textContent = `Acoustic Power: ${power.toExponential(3)} W`;
  } else {
    document.getElementById('result').textContent = 'Please enter valid numerical values.';
  }
});
