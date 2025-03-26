import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useUserData from '../../useUserData';
import DisplayMini from './displayMini';
import DragAndDrop from '../images/DragAndDrop'
import { postMini } from '../../services/mini';
import { postImage } from '../../services/image';
import { Button, HR, Label, TextInput } from 'flowbite-react';

const MiniNew = () => {

  const [mini, setMini] = useState({name: "", images: []});
  const { token } = useUserData();
  const navigate = useNavigate();

  useEffect(()=>{
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const miniData = await postMini(mini);
    navigate(`/minis/${miniData._id}`);
  }

  const addImages = async (publicIds) => {
    let images = mini.images;
    for (let publicId of publicIds) {
      const newImage = await postImage({cloudinaryPublicId: publicId});
      images = [newImage, ...images];
    }
    setMini(prevMini => ({ ...prevMini, images }));
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setMini({...mini, name: e.target.value})
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
                value={mini.name}
                onChange={handleNameChange}
              />
            </div>
            <DragAndDrop addImages={addImages} />

            <Button type="submit">Save</Button>
          </form>
          <HR/>
          <DisplayMini mini={mini} />
        </div>
      }
      {!token &&
        <Button as={Link} to={`/login`}>Login?</Button>
      }
    </>
  )
}


export default MiniNew