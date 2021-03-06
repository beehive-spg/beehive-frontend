# Beehive Webapp Frontend
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<img src="https://i.imgur.com/VnKmMI0.png" width="20%">

beehive-frontend acts as the visual representation of the beehive project. It shows all hives in a
city, the currently active drones as well as some additional information in sidebars.

Disclaimer: this repository should only be used for develpment. To use beehive itself look at the
[beehive repository](https://github.com/beehive-spg/beehive).

## Motivation
This project serves the purpose of being able to show how the simulation network behaves and
performes. Currently this is a diploma-project of a team of four students, the other project
repositories can be found [here](https://github.com/beehive-spg).

## Screenshots
<img src="https://i.imgur.com/QX1248s.png">

## Development

### Tech/Frameworks used
This project is based on [create-react-app](https://github.com/facebookincubator/create-react-app).
Map visualization is done with [Mapbox](https://www.mapbox.com) by the use of Uber's
[react-map-gl](https://github.com/uber/react-map-gl). Additionally
[deck.gl](https://github.com/uber/deck.gl) is used for custom layers.

Other relevant technologies:
* [Redux](https://github.com/reactjs/react-redux)
* [Apollo GraphQL](https://github.com/apollographql/apollo-client)

### Prerequisites
Before starting development [yarn](https://yarnpkg.com) should be installed.
After cloning the repository don't forget to ```yarn install```.

### Testing
Tests for each module can be found in the ```__tests__``` folder of each directory. Tests are named
after the file that is being tested on, as in ```*.test.js```.

## Usage
To get up and running with the project either build it with ```yarn build``` and then serve it on a
server or local, or execute ```yarn start``` which will start a local development server on port
3000 and open a new browser window.

## Known Issues

Should you get the error ```Node Sass does not yet support your current environment``` when starting
the application execute the following commands: 

```yarn remove node-sass-chokidar```
and 
```yarn add node-sass-chokidar```

This should fix the error and the application can be started.

## Thanks
Icons provided by [The Noun Project](https://thenounproject.com).
- Customer: created by Gonzalo Bravo
- Shop: created by Anton Gajdosik
