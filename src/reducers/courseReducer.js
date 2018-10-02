//set default state by using state = [], this is by using the defaults feature of ES6

export default function courseReducer(state = [], action){
  switch(action.type) {
    case 'CREATE_COURSE':
      //...is the spread operator,
      return [...state, Object.assign({},action.course)];
    case 'DELETE_COURSE':
      return state.filter( x => x.title !== action.course.title);
    default:
      return state;
  }
}
