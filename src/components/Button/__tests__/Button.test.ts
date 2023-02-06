import { getByRole } from '@testing-library/dom';
import { renderBlock } from '../../../tests/renderBlock';
import { Button } from '../Button';

describe('Button', () => {
  test('should render', async () => {
    renderBlock(Button, { label: 'test' });

    const button = getByRole(document.body, 'button');

    expect(button).toBeInTheDocument();
  });

  test('should call onClick', async () => {
    const mockFn = jest.fn();
    renderBlock(Button, { onClick: mockFn });

    const button = getByRole(document.body, 'button');

    button.click();

    expect(mockFn).toBeCalled();
  });

  test('should have text label', async () => {
    renderBlock(Button, { label: 'test' });

    const button = getByRole(document.body, 'button');

    expect(button).toHaveTextContent(/test/i);
  });

  test('should be disabled', async () => {
    renderBlock(Button, { label: 'test', disabled: true });

    const button = getByRole(document.body, 'button');

    expect(button).toBeDisabled();
  });

  test('should have attribute type with value submit', async () => {
    renderBlock(Button, { label: 'test', type: 'submit' });

    const button = getByRole(document.body, 'button');

    expect(button).toHaveAttribute('type', 'submit');
  });
});
