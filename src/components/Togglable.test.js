import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        <div className="testDiv" >
          togglable content <button> like </button>
        </div>
      </Togglable>
    ).container
  })

  test('after clicking the "view" button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  // 5.15 tehtävä/ ei toimi ollenkaan
  /*test('clicking the "like" button calls event handler twice', async () => {
    const mockHandler = jest.fn()
    render(
      < container like={mockHandler} />
    )
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })*/
})