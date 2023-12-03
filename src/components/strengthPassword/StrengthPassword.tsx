import { STRENGTH_PASS } from '../../data/constants';

const checkStrengthPass = (password: string) => {
  let value = 0;
  if (STRENGTH_PASS.LOWERCASE.test(password)) {
    value += 1;
  }
  if (STRENGTH_PASS.NUMBER.test(password)) {
    value += 1;
  }
  if (STRENGTH_PASS.SPECIAL.test(password)) {
    value += 1;
  }
  if (STRENGTH_PASS.UPPERCASE.test(password)) {
    value += 1;
  }
  return value;
};

const StrengthPassword = ({ password }: { password: string }) => {
  const value = checkStrengthPass(password);
  let style = '';
  switch (value) {
    case 4:
      style = 'bg-green-700';
      break;
    case 3:
      style = 'bg-lime-300';
      break;
    case 2:
      style = 'bg-yellow-300';
      break;
    case 1:
      style = 'bg-rose-300';
      break;
    default:
      style = 'bg-rose-300';
  }
  return (
    <>
      <input
        type="range"
        min={0}
        max={4}
        step={1}
        value={value}
        className={`${style} appearance-none h-1 w-full`}
      />
    </>
  );
};

export default StrengthPassword;
