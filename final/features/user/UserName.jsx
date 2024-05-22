import { useSelector } from 'react-redux';

function UserName() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div
      className="hidden text-xs 
  font-bold md:block"
    >
      {userName}
    </div>
  );
}

export default UserName;
