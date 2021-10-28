'use strict';
/*
   This is for demonstrating the usage of gauge.js, it creates two gauges
   side-by-side with diffent options settings.
*/
document.addEventListener('DOMContentLoaded', () => {

  // create an Gauge instance with default construct, and set configuration later
  const powerGauge = new Gauge();
  powerGuage.setConfig({
    minValue: 5,
    maxValue: 300000,
    lowThreshhold: 300,
    highThreshhold: 2000,
    scale: 'log',
    displayUnit: 'Log10(x)'
  });
  // create an Guage instance with pass-in configuration object
  const powerGauge2 = new Gauge({
    minValue: 10,
    maxValue: 60,
    lowThreshhold: 28,
    highThreshhold: 42,
    lowThreshholdColor: "#dcdcdc",
    defaultColor: "#a9a9a9",
    highThreshholdColor: "#696969",
    displayUnit: 'Degree ℃'
  })

  powerGauge.render("#gauge");
  powerGauge2.render("#gauge2");

  // re-configure the gauge panel
  powerGauge2.setConfig({minValue: 20, maxValue:50}).render("#gauge2");

  // Generate a random reading every 3 seconds
  setInterval(function() {
    powerGauge.update(Math.random()*1000);
    powerGauge2.update(Math.random()*30+20);
  }, 2 * 1000);

});
