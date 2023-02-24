import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    let ignore = false;
    personService.getAll().then((initialData) => {
      if (!ignore) {
        console.log("fetched");
        setPersons(initialData);
      }
    });
    return () => (ignore = true);
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const personInDB = persons.find((person) => person.name === newName);

    if (personInDB) {
      if (
        window.confirm(
          `${newName} already exists. Would you like to update their number?`
        )
      )
        personService
          .update(personInDB.id, newPerson)
          .then(() => {
            setPersons(
              persons.map((p) =>
                p.id === personInDB.id ? { ...p, number: newNumber } : p
              )
            );
            notify("success", `Updated ${newName}`);
          })
          .catch((error) => {
            notify(
              "error",
              `Information of '${newName}' was already deleted from server`
            );
            setPersons(persons.filter((p) => p.id !== personInDB.id));
          });
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        notify("success", `Added ${returnedPerson.name}`);
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      console.log(`removing ${person.name} id ${person.id}`);
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          notify("success", `Removed ${person.name}`);
        })
        .catch((error) => {
          notify(
            "error",
            `${person.name} has already been deleted from the server`
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification content={notification} />
      <Filter changeHandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        submitHandler={addPerson}
        nameValue={newName}
        nameChangeHandler={handleNameChange}
        numberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsList persons={filteredPersons} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
