import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as useMandelbrotRendererModule from './hooks/use-mandelbrot-renderer';

jest.mock('./hooks/use-mandelbrot-renderer');

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(useMandelbrotRendererModule, 'useMandelbrotRenderer').mockReturnValue({
      canvasRef: { current: null },
      isRendering: false,
    });
  });

  it('renders the Mandelbrot Set Visualizer title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Mandelbrot Set Visualizer/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the controls panel', () => {
    render(<App />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders the canvas section', () => {
    render(<App />);
    const heading = screen.getByText(/Visualization/i);
    expect(heading).toBeInTheDocument();
  });
});
