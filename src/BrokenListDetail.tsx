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
  const PersonEditor = ({
    person,
    onChange,
  }: {
    person: Person;
    onChange: (person: Person) => void;
  }) => {

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedPerson = { ...person, name: e.target.value };
      onChange(updatedPerson);
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedPerson = {
        ...person,
        age: parseInt(e.target.value),
      } as Person;
      onChange(updatedPerson);
    };

    return (
      <div>
        <h2>Edit Person</h2>
        <input
          type="text"
          value={person.name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          value={person.age}
          onChange={handleAgeChange}
        />
      </div>
    );
  };

  // The function to call when person data changes
  const updatePerson = (updatedPerson: Person) => {
    if (selectedPersonIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[selectedPersonIndex] = updatedPerson;
      setPeople(updatedPeople);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <PeopleList />
        </div>
        {selectedPersonIndex !== null && (
          <div>
            <PersonEditor
              person={people[selectedPersonIndex]}
              onChange={updatePerson}
            />
          </div>
        )}
      </div>
    </>
  );
}
