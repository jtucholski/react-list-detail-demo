import { useState } from 'react';

type Person = {
  name: string;
  age: number;
  friends: Person[];
};

export default function ListDetail() {

  // State for the page
  const [people, setPeople] = useState<Person[]>([
    {
      name: 'John',
      age: 30,
      friends: [
        { name: 'Mike', age: 25, friends: [] },
        { name: 'Sam', age: 26, friends: [] },
      ],
    },
    {
      name: 'Jane',
      age: 32,
      friends: [
        { name: 'Amy', age: 24, friends: [] },
        { name: 'Sue', age: 29, friends: [] },
      ],
    },
    {
      name: 'Sally',
      age: 28,
      friends: [
        { name: 'Tom', age: 31, friends: [] },
        { name: 'Jerry', age: 30, friends: [] },
      ],
    },
    {
      name: 'Bob',
      age: 35,
      friends: [
        { name: 'Kevin', age: 34, friends: [] },
        { name: 'Paul', age: 33, friends: [] },
      ],
    },
  ]);

  // Index of the selected person
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

  const handleFriendChange = <T extends keyof Person>(
    friendIndex: number,
    field: T,
    value: Person[T]
  ) => {
    if (selectedPersonIndex !== null) {
      const updatedPeople = [...people];
      const updatedFriends = [...updatedPeople[selectedPersonIndex].friends];
      updatedFriends[friendIndex] = {
        ...updatedFriends[friendIndex],
        [field]: value,
      };
      updatedPeople[selectedPersonIndex].friends = updatedFriends;
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
            <FriendsEditor
              friends={people[selectedPersonIndex].friends}
              onFriendChange={handleFriendChange}
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
          <div>
            <strong>Friends:</strong>
            <ul>
              {person.friends.map((friend, friendIndex) => (
                <li key={friendIndex}>
                  {friend.name} ({friend.age} years old)
                </li>
              ))}
            </ul>
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

const FriendsEditor = ({
  friends,
  onFriendChange,
}: {
  friends: Person[];
  onFriendChange: <T extends keyof Person>(
    friendIndex: number,
    field: T,
    value: Person[T]
  ) => void;
}) => {
  return (
    <div>
      <h3>Edit Friends</h3>
      <table>
        <thead>
          <tr>
            <th>Friend's Name</th>
            <th>Friend's Age</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, friendIndex) => (
            <tr key={friendIndex}>
              <td>
                <input
                  type="text"
                  value={friend.name}
                  onChange={(e) =>
                    onFriendChange(friendIndex, 'name', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={friend.age}
                  onChange={(e) =>
                    onFriendChange(friendIndex, 'age', parseInt(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
