import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      course: {title: ""}
    };

    this.onClickSave = this.onClickSave.bind(this);
    this.onTitleChange = this. onTitleChange.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course:course});
  }

  //this is wrapped in a dispatch below
  onClickSave(){
    this.props.actions.createCourse(this.state.course);
  }

  courseRow(course,index){
    return <div key = {index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value = {this.state.course.title} />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
return {
  //gets this from reducers/index.js
  courses: state.courses
};

}

//goes through all courseActions and find the actions in the file and wrap them in a call to dispatch
function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

//exports courses page wrapped in connect.
//connect returns a function, which takes courses page as a parameter.
//if mapDispatchToProps is removed, then this component automatically gets a dispatch property attached to it by Connect
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
