import '@testing-library/jest-dom';
import ErrorPage from './error-page';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// import * as TestRenderer from 'react-test-renderer';
import { screen, render } from '@testing-library/react';

// describe('ErrorPage', () => {
//   it('landing on a bad page', () => {
//     const badRoute = '/some/bad/route';

//     let renderer: TestRenderer.ReactTestRenderer;
//     TestRenderer.act(() => {
//       renderer = TestRenderer.create(
//         <MemoryRouter initialEntries={[badRoute]}>
//           <Routes>
//             <Route path="/some/bad/route" errorElement={<ErrorPage />} />
//           </Routes>
//         </MemoryRouter>
//       );
//     });
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     expect(renderer.toJSON()).toMatchSnapshot(
//       `<div>
//         <h2>Something went wrong!</h2>
//         <h2>404</h2>
//         <p>Not Found</p>
//       </div>`
//     );
//   });
// });
// const mockUseNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockUseNavigate,
// }));
describe('ErrorPage', () => {
  it('landing on a bad page', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>
          <Route path="/some/bad/route" errorElement={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
