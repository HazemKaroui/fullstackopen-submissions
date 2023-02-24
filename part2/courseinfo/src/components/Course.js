const Course = ({ course }) => {
  const listOfParts = course.parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

  const total = course.parts.reduce(
    (sum, current) => sum + current.exercises,
    0
  );

  return (
    <div>
      <h1>{course.name}</h1>
      {listOfParts}
      <p>total of {total} exercises</p>
    </div>
  );
};

export default Course;
