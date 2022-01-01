# D3 Dashboard Gauge

D3 Dashboard Gauge is a node-RED inspired dashboard gauge build with d3js framework. It is:
 - A self-contain re-usable library;
 - High customisable for different IoT projects and sensors;
 - Simple API for creating, rendering and updating the data;
 - Build with d3.js library;
 - Support both linear and log scale.

[![d3 dashboard gauge demo video](https://github.com/e-tinkers/d3-dashboard-gauge/blob/master/images/d3-dashboard-gauge.png)](https://youtu.be/SGOtHbBNIFU)

_Click the image to see YouTube video demo_

## Quick Start

Simply create an html file to include the D3 Dashboard Gauge stylesheet and javascript file. It also load d3 via cdn as dependency.

    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="dist/style.min.css">
      </head>
      <body>
        <div class="gauge-container">
          <div id="gauge"></div>
        </div>
        <script src="https://unpkg.com/d3@5.7.0/dist/d3.min.js"></script>
        <script src="dist/gauge.min.js"></script>
        <script src="example.js"></script>
      </body>
    </html>

The `#gauge-container` `<div>` is required as an container, especially when there are multiple gauges instances on the scren, it helps to style the gauges to be placed side-by-side. When there is more than one gauge is required, create addition `<div>` with unique id within the `#gauge-container` as you wish. The `example.js` shows two gauges placed side-by-side with different configuration.

D3 Dashboard Gauge is a javascript class that can be instantiated, and it mainly consists two public methods, `Gauge.render()` and `Gauge.update()`. The usage is simple, create an instance of Gauge class, render it, and whenever there is a new value, update it.

    const myGauge = new Gauge(configOptions);
    myGauge.render("#gauge");
    myGauge.update(updateValue);

## API Documentation

#### Gauge class and configuration
D3 Dashboard Gauge is highly customizable by passing an optional configuration object when instantiating an class instance.

    const tempGauge = new Gauge({
      minValue: -20,
      maxValue: 50,
      lowThreshhold: 0,
      highThreshhold: 40,
      displayUnit: 'Degree Celcius'
    });

If a configuration object is not provided during the instantiation of the Guage class, the default configuration options will be used. The default configuration options consists of:

    config = {
      size : 200,
      margin : 10,
      minValue : 0,
      maxValue : 10,
      majorTicks : 5,
      lowThreshhold : 3,
      highThreshhold : 7,
      scale: 'linear',
      lowThreshholdColor : '#009900',
      defaultColor : '#ffe500',
      highThreshholdColor : '#cc0000',
      transitionMs : 1000,
      displayUnit: 'Value'
    };

![configurable d3 dashboard gauge parameters](https://github.com/e-tinkers/d3-dashboard-gauge/blob/master/images/configurale-d3-dashboard-gauge-parameters.png)

The picture help to visualised all the configurable parameters.

**size:** Defines the width of the gauge, excluding the margins on both sides. Default value is _200px_.

**margin:** Margin add extra pixels on both sides of the gauge container so that the text of the scale can be displayed without being cut off. Default value is _10px_ on each side of the gauge container.

**minValue:** Refers to the mininum value of the scale to be displayed. It could be a negative value, e.g. when repsenting temperature, say, -20 degree celcius. Default value is set to _0_.

**maxValue:** Refers to the maxium value of the scale to be displayed.

**majorTicks:** Defines the number of major ticks to be displayed on the gauge scale. a value of 5 on a scale 0 to 10 means that there will 6 ticks on 0, 2, 4, 6, 8, 10. The default value is _5_.

**lowThreshhold:** Defines the lower threshhold value in between the **minValue** and **maxValue**. The default is _3_.

**highThreshhold:** Defines the higher threshhold value in between the **minValue** and **maxValue**. When you change the minValue and maxValue, you are likely have to change the lowThreshhold and highThreshhold values too. The default value for highThreshhold is _7_.

**lowThreshholdColor:** Defines the color to be used for the scale range between **minValue** and **lowThreshhold**. Default color is set to a greenish color with RGB value of _#009900_.

**scale:** Defines whether the display will be **'linear'** or **'log'** scale. Default is _'linear'_. Only log base 10 (i.e.log10(x)) is supported.

**defaultColor:** This is the color to be used between **lowThreshhold** and **highThreshhold**. Default color is _#ffe500_ which is a yellowish color.

**highThreshholdColor:** The color to be used between **highThreshhold** and **maxValue**. Default is set to _#cc0000_ red.

**transitionMs:** When a number is updated via the `update()` method, the change of the value is animated and transit from old value to new value. The transitionMS is used to define how long the transition time will take in milli-second. Default is _1000_ ms(1 second).

**displayUnit:** This is the string label used to display the value it represented on the display. The default is _'Value'_.

#### Rendering the gauge

Once the an instance of the Gauge class is created with customized or default configuration, you can call the `render()` method to render the gauge at a specific location identified by a html `id` tag.

    tempGauge.render('#gauge');

The `render()` menthod creates an SVG object to render the gauge using d3js functionalities.

#### Update the gauge

Whenever the data value change, simply call the `update()` to update the value.

    tempGauge.update(newValue);

You can setup how often the `update()` methold should be called by wrapping it within a JavaScript `setInterval` function. Please noted that the time for each update should be longer than the **transitionMs** value you used so that the rendering can be transiting to the newValue before it changing again.

    // example for updating the gauge value in every 2 seconds
    setInterval(function() {
        powerGauge.update(Math.random()*30+20);
    }, 2 * 1000);

#### Re-config the gauge

If for any reason you would need to re-config the guage (for example, re-scale the display panel) dynamically, there is a helper function `setConfig()` allows to passing the new configuration object. Calling `render()` method is required for the new settings to be taken effect after changing the configuration.

    tempGauge.setConfig({minValue : 20, maxValue : 50}).render('#gauge');

## Demo

Click on the image above to see the YouTube video demo or click [this link](https://e-tinkers.github.io/d3-dashboard-gauge/) to see the live demonstration.

## License
This repository is licensed under MIT License.
