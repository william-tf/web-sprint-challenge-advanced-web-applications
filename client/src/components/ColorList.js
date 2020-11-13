import React, { useState } from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom'
import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [id, setId] = useState('')
  //const {push} = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/${id}`, colorToEdit)
    .then((res)=>{
      console.log('this is in colorlist put:', res)
      updateColors(
        colors.map((color) =>{
          if(color.id == Number(id)){
            return res.data
          }else{
            return color
          }
        })
      )
    })
    .catch(err => console.log('inside colorlist put catch:', err))
    //push('/colors')
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(res => {
      updateColors(
        colors.filter((newColor) => {
          return newColor.id !== id
        })
      )
    })
    .catch(err => console.log('this is inside colorlist catch', err))
    //push('/colors')
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li data-testid="color" key={color.color} onClick={() => {
            editColor(color)
            console.log(color.id)
            setId(color.id)
            
            }}>
            
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
