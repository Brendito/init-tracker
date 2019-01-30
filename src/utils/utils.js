import * as types from "../constants/formGroupTypes";
export function formGroupListener(name, value, type, state) {
  switch (type) {
    case types.ATTRIBUTES:
;      return { attributes: { ...state.attributes, [name]: value } };
    // case types.STATS:
    //   this.setState({
    //     stats: { ...this.state.stats, [name]: value }
    //   });
    //   break;
    default:
      return { [name]: value };
  }
}
