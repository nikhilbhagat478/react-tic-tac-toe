import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick() {
    setIsEditing(false);
  }
  return (
    <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && <input type="text" />}
        <span className="player-symbol">{symbol}</span>
      </span>
      {isEditing && <button onClick={handleSaveClick}>Save</button>}
      {!isEditing && <button onClick={handleEditClick}>Edit</button>}
    </li>
  );
}
