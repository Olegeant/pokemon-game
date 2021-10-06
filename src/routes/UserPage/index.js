import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser, removeUser } from '../../redux/user';

const UserPage = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    localStorage.removeItem('idToken');
    dispatch(removeUser());
    history.push('/');
  };

  return (
    <>
      <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>USER INFO</h1>
      <table style={{ fontFamily: 'inherit', fontSize: '1rem', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px 0' }}>Field</th>
            <th style={{ textAlign: 'left', padding: '10px 0' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries({ ...user }).map(([key, value]) => (
            <tr>
              <td>{key.toString()}</td>
              <td>{value.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={handleLogOut}>
        LOG OUT
      </button>
    </>
  );
};

export default UserPage;
