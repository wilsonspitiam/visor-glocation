import * as map from './src/js/map';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import homeStyle from './src/css/style.css';

map.hola();

map.init();

library.add(faCheck);
dom.watch();