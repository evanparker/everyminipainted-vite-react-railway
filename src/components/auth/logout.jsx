import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { postLogout } from '../../services/auth';
import { Button } from 'flowbite-react';

const Logout = ({resetUserData}) => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postLogout({});
    resetUserData();
    navigate('/');
}

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </>
  )
}

Logout.propTypes = {
  resetUserData: PropTypes.func.isRequired,
  token: PropTypes.string
}

export default Logout