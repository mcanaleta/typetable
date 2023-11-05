import { BaseType } from "@mcanaleta/fieldtypes";
import React, {
  ElementType,
  InputHTMLAttributes,
  useEffect,
  useMemo,
} from "react";
import styled from "styled-components";

export type SuperInputProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "setValue" | "type"
> & {
  value: T | null;
  setValue: (value: T | null) => void;
  type: BaseType<T>;
  selectOnFocus?: boolean;
  as?: React.ComponentType<InputHTMLAttributes<HTMLInputElement>>;
};

const StyledOption = styled.div<{
  $active: boolean;
}>`
  display: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${(props) =>
    props.$active ? "rgb(240,240,255)" : "white"};
  cursor: pointer;
  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

export function SuperInput<T>(props: SuperInputProps<T>) {
  const { value, setValue, type, selectOnFocus } = props;
  const inputProps = { ...props, setValue: undefined, type: undefined };
  delete inputProps.setValue;
  delete inputProps.type;
  delete inputProps.selectOnFocus;

  const [currentValue, setCurrentValue] = React.useState(type.display(value));
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    return type.options();
  }, []);

  const filteredOptions = useMemo(() => {
    return options?.filter((option) =>
      type.display(option)?.toLowerCase()?.includes(currentValue?.toLowerCase())
    );
  }, [options, currentValue]);

  useEffect(() => {
    setCurrentValue(type.display(value));
  }, [value]);
  const ElementType = props.as || "input";

  return (
    <>
      <ElementType
        {...inputProps}
        ref={inputRef}
        value={currentValue}
        onChange={(event) => {
          setCurrentValue(event.target.value);
          setDropdownOpen(true);
        }}
        onKeyDown={(event) => {
          if (filteredOptions) {
            if (
              event.key === "ArrowDown" &&
              activeIndex < filteredOptions.length - 1
            ) {
              setActiveIndex((index) => index + 1);
            } else if (event.key === "ArrowUp" && activeIndex > 0) {
              setActiveIndex((index) => index - 1);
            } else if (event.key === "Enter") {
              setValue(filteredOptions[activeIndex]);
              setDropdownOpen(false);
              event.currentTarget.blur();
            }
          }
        }}
        onBlur={(event) => {
          if (!options) {
            const parsedValue = type.parse(event.target.value);
            if (parsedValue !== undefined && !Number.isNaN(parsedValue)) {
              setValue(parsedValue);
            } else {
              setCurrentValue(type.display(value));
            }
          } else {
            setDropdownOpen(false);
          }
        }}
        onMouseDown={(event) => {
          setDropdownOpen(true);
        }}
        onFocus={(event) => {
          if (selectOnFocus) {
            event.target.select();
          }
        }}
      />
      {dropdownOpen && filteredOptions && (
        <div
          style={{
            display: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              padding: "0",
              margin: 0,
              border: "1px solid lightgray",
            }}
          >
            {filteredOptions.length == 0 ? "(no results)" : ""}
            {filteredOptions.map((option, index) => (
              <StyledOption
                key={type.getId(option)}
                $active={index === activeIndex}
                onMouseDown={() => {
                  setValue(option);
                  setDropdownOpen(false);
                  inputRef.current?.blur();
                }}
              >
                {type.display(option)}
              </StyledOption>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
