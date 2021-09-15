const GamePage = ({ onChangePage }) => {
  return (
    <>
      <h1>This is GamePage !!!</h1>;
      <button type="button" onClick={() => onChangePage('app')}>
        Back to Homepage
      </button>
    </>
  );
};

export default GamePage;
