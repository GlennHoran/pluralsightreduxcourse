//this is the action creator

export function createCourse(course) {
  return {
    type: 'CREATE_COURSE',
    course: course
  };
}

export function deleteCourse(course) {
  return {
    type: 'DELETE_COURSE',
    course:course
  };
}
