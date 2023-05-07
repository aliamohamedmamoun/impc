import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';

interface IInputRange {
  labelText: string | '';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string | 'basic-range-input';
  value: number;
}
// TODO: Inhance InputRange sliding effect
export default function InputRange({
  labelText,
  handleChange,
  id,
  value,
}: IInputRange) {
  return (
    <Form.Group className="mt-3 position-relative">
      <Form.Label>{labelText}</Form.Label>
      <Form.Range id={id} name={id} onChange={handleChange} value={value} />
    </Form.Group>
  );
}
