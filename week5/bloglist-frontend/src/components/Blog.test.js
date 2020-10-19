import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    user: {
      name: "test"
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'blogTitle'
  )
  expect(component.container).toHaveTextContent(
    'blogAuthor'
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('renders full content when button pressed', () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    user: {
      name: "test"
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'blogTitle'
  )
  expect(component.container).toHaveTextContent(
    'blogAuthor'
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  const openDiv = component.container.querySelector('.togglableContent')
  expect(openDiv).not.toHaveStyle('display: none')

  expect(component.container).toHaveTextContent(
    'blogTitle'
  )
  expect(component.container).toHaveTextContent(
    'blogAuthor'
  )

  expect(component.container).toHaveTextContent(
    'blogUrl'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    user: {
      name: "test"
    },
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )


  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})