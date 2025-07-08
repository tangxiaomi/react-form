import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import FormStep1 from './FormStep1'
import { FormProvider } from '../../../contexts/FormContext'

describe('FormStep1 组件测试', () => {
  const setup = () => {
    const mockNext = vi.fn()
    const user = userEvent.setup()
    
    const utils = render(
      <FormProvider>
        <FormStep1 nextStep={mockNext} />
      </FormProvider>
    )

    return {
      user,
      mockNext,
      ...utils
    }
  }

  it('should render form', () => {
    setup()
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
  })

  it('validate required fields', async () => {
    const { user } = setup()
    await user.click(screen.getByText('Next'))
    expect(await screen.findAllByText(/required/)).not.toBe(0);
  })

  it('submission nextStep function', async () => {
    const { user, mockNext } = setup()
    
    await user.type(screen.getByLabelText('First Name'), 'John')
    await user.type(screen.getByLabelText('Last Name'), 'Doe')
    await user.type(screen.getByLabelText('Date of Birth'), '2000-01-01')
    
    await user.click(screen.getByText('Next'))
    
    expect(mockNext).toHaveBeenCalled()
    expect(screen.queryByText(/required/)).toBeNull()
  })
})