import { useState } from 'react';

type Person = {
  name: string;
  age: number;
};
export default function BrokenListDetail() {

  // State for the page
  const [people, setPeople] = useState<Person[]>([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 32 },
    { name: 'Sally', age: 28 },
    { name: 'Bob', age: 35 },
  ]);

  // Selected person index
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);

  // Left-side component
  const PeopleList = () => {
    return people.map((person, index) => {
      return (
        <div
          className="card"
          style={{ border: '1px solid red' }}
          key={index}
          onClick={() => setSelectedPersonIndex(index)}
        >
          {person.name} ({person.age} years old)
        </div>
      );
    });
  };

  // Right-side component
  const PersonEditor = (props: {
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

  // The function to call when person data changes
  const updatePerson = (updatedPerson: Person) => {
    // Generate a new array of people with the one person updated
    const updatedPeople = people.map((p) =>
      p.name === people[selectedPersonIndex!].name ? updatedPerson : p
    );
    setPeople(updatedPeople);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <PeopleList />
        </div>
        <div>
          {selectedPersonIndex != null ? (
            <PersonEditor person={people[selectedPersonIndex]} updatePerson={updatePerson} />
          ) : null}
        </div>
      </div>
    </>
  );
}
