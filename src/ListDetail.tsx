import { useState, useEffect } from 'react';

type Person = {
  name: string;
  age: number;
};

export default function ListDetail() {

  // State for the page
  const [people, setPeople] = useState<Person[]>([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 32 },
    { name: 'Sally', age: 28 },
    { name: 'Bob', age: 35 },
  ]);

  // Selected person index
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(
    null
  );

  const handlePersonSelect = (index: number) => {
    setSelectedPersonIndex(index);
  };

  // The function to call when person data changes in PersonEditor
  const updatePerson = (updatedPerson: Person) => {
    if (selectedPersonIndex !== null) {
      console.log(`BrokenListDetail updating state for ${updatedPerson.name}`);
      const updatedPeople = [...people];
      updatedPeople[selectedPersonIndex] = updatedPerson;
      setPeople(updatedPeople);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <PeopleList people={people} onPersonSelect={handlePersonSelect} />
        </div>
        {selectedPersonIndex !== null && (
          <div>
            <PersonEditor
              key={selectedPersonIndex}
              person={people[selectedPersonIndex]}
              onChange={updatePerson}
            />
          </div>
        )}
      </div>
    </>
  );
}

const PeopleList = ({
  people,
  onPersonSelect,
}: {
  people: Person[];
  onPersonSelect: (index: number) => void;
}) => {
  return (
    <div>
      {people.map((person, index) => (
        <div
          className="card"
          style={{
            border: '1px solid red',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
          key={index}
          onClick={() => onPersonSelect(index)}
        >
          <div>
            {person.name} ({person.age} years old)
          </div>
        </div>
      ))}
    </div>
  );
};

const PersonEditor = ({
  person,
  onChange,
}: {
  person: Person;
  onChange: (person: Person) => void;
}) => {

  useEffect(() => {
    console.log(`%cPerson editor for ${person.name} mounted.`, "background-color: green; color: white");
    return () => {
      console.log(`%cPerson editor for ${person.name} unmounted.`, "background-color: green; color: white");
    }
  }, [person]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPerson = { ...person, name: e.target.value };
    console.log(`PersonEditor onChange triggered for ${updatedPerson.name}`);
    onChange(updatedPerson);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPerson = {
      ...person,
      age: parseInt(e.target.value),
    } as Person;
    console.log(`PersonEditor onChange triggered for ${updatedPerson.name}`);
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