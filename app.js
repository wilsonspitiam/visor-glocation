import * as map from './src/js/map'
import * as mapController from './src/js/mapController'
import * as actions from './src/js/actions'

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import homeStyle from './src/css/style.css';

library.add(fas, far, fab) 
dom.watch()

map.init()
mapController.init()
actions.init()