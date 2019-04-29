# 0.2.3-alpha (2019-04-29)

### Perfect

- **graph:** Improve graph basic properties.
- **Documentation:** Perfect documentation.

# 0.2.2-alpha (2019-04-25)

### Perfect

- **order:** Change the default render order of the graphs.(First Add First Render)
- **style:** Optimize lineDash rendering effects.

# 0.2.1-alpha (2019-04-24)

### Bug Fixes

- **CRender:** Initializing the canvas without setting its width and height attributes causes the rendering to be abnormal.

# 0.2.0-alpha (2019-04-15)

### Core

- **style:** Use the [Style](https://github.com/jiaming743/CRender#class-style) class to manage the graph style.
- **graph:** Instantiate graph using the [Graph](https://github.com/jiaming743/CRender#class-graph) class.
- **prototype:** Renamed some prototype methods.

### Features

- **graphs:** Add new graphs.([bezierCurve](https://github.com/jiaming743/CRender#bezierCurve),[text](https://github.com/jiaming743/CRender#text))
- **enhance:** `smoothline`, `bezierCurve`, `polyline` added the `closed` attribute.

# 0.1.4-alpha (2019-02-17)

### Bug Fixes

- **graphs:** `shape.length` is less than 3 draw exception.(`polyline`)
- **graphs:** Hover check exception when startAngle is more than endAngle.(`arc`,`sector`)

# 0.1.3-alpha (2019-02-16)

### Features

- **graphs:** Add new graphs ([polyline](https://github.com/jiaming743/CRender#polyline),[smoothline](https://github.com/jiaming743/CRender#smoothline))
- **prototype:** Add methos to delete graphs (`deleteAllElements`,`deleteElement`)