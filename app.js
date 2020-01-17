import * as map from './src/js/map'
import * as mapController from './src/js/mapController'
import * as actions from './src/js/actions'
import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import homeStyle from './src/css/style.css';
import logo from './src/img/logo.png';
import header from './src/img/header.png';
import loader from './src/img/loader.gif';
import favicon from './src/favicon.ico';

library.add(fas, far, fab) 
dom.watch()

map.init()
mapController.init()
actions.init()