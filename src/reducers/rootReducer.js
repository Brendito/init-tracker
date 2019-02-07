import {tracker} from './trackerReducer';
import {campaign} from './campaignReducer'
import {combineReducers} from 'redux';

export default combineReducers({tracker, campaign})
