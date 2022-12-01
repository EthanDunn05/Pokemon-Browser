import React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

interface IProps {
  values: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (newValue: string, e: React.SyntheticEvent<unknown>) => void;
}

/**
 * A dropdown to select from a list of strings
 *
 * @param values The possible values that can be selected
 * @param value The current value of the dropdown. Controlled by the dropdown if undefined
 * @param defaultValue The default value to use when first loaded
 * @param onChange An event called when the value is changed. Use with the value parameter to control this component
 */
function StringSelector(props: IProps): JSX.Element {
  const { values, value: propValue, defaultValue, onChange } = props;

  // Use either the controlled value, or the uncontrolled value
  const [getStateVersion, setStateVersion] = useState(
    defaultValue ?? values[0]
  );
  const version = propValue ?? getStateVersion;

  function handleSelect(
    key: string | null,
    e: React.SyntheticEvent<unknown>
  ): void {
    if (!key) return;

    // Use controlled and uncontrolled according to what is used
    if (onChange) onChange(key, e);
    if (!propValue) setStateVersion(key);
  }

  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <DropdownToggle className='ms-auto px-4'>{version}</DropdownToggle>
        <DropdownMenu style={{ columns: 2 }}>
          {values.map((v) => (
            <DropdownItem eventKey={v}>{v}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default StringSelector;
