import React, { useEffect, useState } from 'react';

type DropDownProps = {
  levels: string[];
  showLevel: boolean;
  toggleLevel: Function;
  levelSelection: Function;
};

const LevelDropDown: React.FC<DropDownProps> = ({
  levels,
  levelSelection,
}: DropDownProps): JSX.Element => {
    const [showLevel, setShowLevel] = useState<boolean>(false)


  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param city  The selected city
   */
  const onClickHandler = (city: string): void => {
    levelSelection(city);
  };

  useEffect(() => {
    setShowLevel(!showLevel)
  }, []);

  return (
    <>
      <div className={showLevel ? 'dropdown' : 'dropdown active'}>
        {levels.map(
          (city: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(city);
                }}
              >
                {city}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default LevelDropDown;
