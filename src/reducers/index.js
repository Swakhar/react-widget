import { combineReducers } from 'redux';
import VisibleWidgets from './visible_widgets';

const rootReducer = combineReducers({
  visibleWidgets: VisibleWidgets,
});

export default rootReducer;
