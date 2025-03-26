import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useUserData from '../../useUserData';
import DisplayFigure from './displayFigure';
import DragAndDrop from '../images/DragAndDrop'
import { postFigure } from '../../services/figure';
import { postImage } from '../../services/image';
import { Button, HR, Label, TextInput } from 'flowbite-react';

const FigureNew = () => {

  const [figure, setFigure] = useState({name: "", images: []});
  const { token } = useUserData();
  const navigate = useNavigate();

  useEffect(()=>{
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const figureData = await postFigure(figure);
    navigate(`/figures/${figureData._id}`);
  }

  const addImages = async (publicIds) => {
    let images = figure.images;
    for (let publicId of publicIds) {
      const newImage = await postImage({cloudinaryPublicId: publicId});
      images = [newImage, ...images];
    }
    setFigure(prevFigure => ({ ...prevFigure, images }));
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setFigure({...figure, name: e.target.value})
  }

  return (
    <>
      {token &&
        <div>
          <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-5">
            <div className=" mb-2 block">
              <Label htmlFor="name1">Name</Label>
              <TextInput
                id="name1"
                type="text"
                value={figure.name}
                onChange={handleNameChange}
              />
            </div>
            <DragAndDrop addImages={addImages} />

            <Button type="submit">Save</Button>
          </form>
          <HR/>
          <DisplayFigure figure={figure} />
        </div>
      }
      {!token &&
        <Button as={Link} to={`/login`}>Login?</Button>
      }
    </>
  )
}


export default FigureNew