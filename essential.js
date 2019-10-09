function random(a, b=0) {
  return Math.floor(Math.random()*(a-b))+b;
}

function deg_to_rad(deg) {
  return (Math.PI/180)*deg;
}

function hex_to_rgb(hex) {
  hex = hex.slice(1, hex.length);
  let arr = hex.match(/.{1,2}/g);

  for(let i=0; i<arr.length; ++i) {
    arr[i] = parseInt(arr[i], 16);
  }

  return arr;
}

function heart_funtion(theta) {
  return ( ( ( Math.sin(theta) * Math.sqrt( Math.abs(Math.cos(theta) ) ) ) / ( Math.sin(theta)/100 + (7/5) ) ) - 2*Math.sin(theta)/6 + 2 );
}
