import s from './filter.module.scss';

interface FilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <label className={s.filter}>
        Search:
        <input
          className={s.filter__input}
          type='text'
          name='filter'
          value={filter}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

export default Filter;
