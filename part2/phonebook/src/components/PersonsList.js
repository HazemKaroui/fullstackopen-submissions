const PersonsList = ({ persons, deleteHandler }) => {
  console.log("rendering with persons:", persons);
  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteHandler(person)}>delete</button>
    </div>
  ));
};
export default PersonsList;
