import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

interface IAutoComplete {
  options: Array<Object | string>;
  multiple: boolean | false;
  handleChange: (selected: Array<Object | string>) => void;
  selections: Array<Object | string>;
  labelText: string | '';
  placeHolder: string | 'Please enter text';
  optionsLabelKey: string;
  id: string | 'basic-typeahead-multiple';
}

export default function AutoComplete({
  options,
  multiple,
  handleChange,
  selections,
  placeHolder,
  labelText,
  optionsLabelKey,
  id,
}: IAutoComplete) {
  return (
    <Form.Group className="mt-3">
      <Form.Label>{labelText}</Form.Label>
      <Typeahead
        id={id}
        labelKey={optionsLabelKey}
        multiple={multiple}
        onChange={handleChange}
        options={options}
        placeholder={placeHolder}
        selected={selections}
      />
    </Form.Group>
  );
}
