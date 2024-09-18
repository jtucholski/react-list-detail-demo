import { useState } from 'react';

type Person = {
  name: string;
  age: number;
};

export default function ListDetail() {

  // State for the page
  const [people, setPeople] = useState<Person[]>([
    {
      name: 'John',
      age: 30,    
    },
    {
      name: 'Jane',
      age: 32,      
    },
    {
      name: 'Sally',
      age: 28,      
    },
    {
      name: 'Bob',
      age: 35,      
    },
  ]);

  // Selected person index
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(
    null
  );

  const handlePersonSelect = (index: number) => {
    setSelectedPersonIndex(index);
  };

  const handleChange = <T extends keyof Person>(field: T, value: Person[T]) => {
    if (selectedPersonIndex !== null) {
      const updatedPeople = [...people];
      updatedPeople[selectedPersonIndex][field] = value;
      setPeople(updatedPeople);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PeopleList people={people} onPersonSelect={handlePersonSelect} />
        {selectedPersonIndex !== null && (
          <div>
            <PersonEditor
              person={people[selectedPersonIndex]}
              onChange={handleChange}
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
  onChange: <T extends keyof Person>(field: T, value: Person[T]) => void;
}) => {
  return (
    <div>
      <h2>Edit Person</h2>
      <input
        type="text"
        value={person.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <input
        type="number"
        value={person.age}
        onChange={(e) => onChange('age', parseInt(e.target.value))}
      />
    </div>
  );
};