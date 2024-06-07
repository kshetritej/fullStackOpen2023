import { render, screen } from '@testing-library/react';
import {test, expect} from 'vitest';
import Blog from '../components/Blog';

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        url: "testing.react.com",
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})
