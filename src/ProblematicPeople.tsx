import { useState } from 'react';

type Person = {
  name: string;
  age: number;
};
export default function ProblematicPeople() {
  const [people, setPeople] = useState<Person[]>([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 32 },
    { name: 'Sally', age: 28 },
    { name: 'Bob', age: 35 },
  ]);

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const PeopleList = () => {
    return people.map((person, index) => {
      return (
        <div
          className="card"
          style={{ border: '1px solid red' }}
          key={index}
          onClick={() => setSelectedPerson(person)}
        >
          {person.name} is {person.age} years old
        </div>
      );
    });
  };

  const PeopleEditor = (props: {
    person: Person;
    updatePerson: (person: Person) => void;
  }) => {
    if (props.person == null) return null;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedPerson = { ...props.person, name: e.target.value };
      props.updatePerson(updatedPerson);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedPerson = {
        ...props.person,
        age: parseInt(e.target.value),
      } as Person;
      props.updatePerson(updatedPerson);
    };

    return (
      <div>
        <h2>Edit Person</h2>
        <input
          type="text"
          value={props.person.name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          value={props.person.age}
          onChange={handleAgeChange}
        />
      </div>
    );
  };

  const updatePerson = (updatedPerson: Person) => {
    const updatedPeople = people.map((p) =>
      p.name === updatedPerson.name ? updatedPerson : p
    );
    setPeople(updatedPeople);
    setSelectedPerson(updatedPerson); // Update selected person with changes.
  };

  return (
    <>
      <h1>Parent-Child Page</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <PeopleList />
        </div>
        <div>
          {selectedPerson != null ? (
            <PeopleEditor person={selectedPerson} updatePerson={updatePerson} />
          ) : null}
        </div>
      </div>
    </>
  );
}
