// you want to import from test-utils instead of testing-library/react since we overwrote the render function to support our wrapper providers
import { render, screen, waitFor } from '../test-utils';
import Home, { QUERY_TOOLS } from '../../pages/index';
import { tools } from '../../lib/tools';

const mocks = [
    {
        request: {
            query: QUERY_TOOLS,
        },
        result: {
            data: {
                tools: [
                    {
                        id: 1,
                        name: 'Apollo Client React',
                        description:
                            "Manage the entirety of your React app's state and seamlessly execute GraphQL operations.",
                        link: 'https://www.apollographql.com/docs/react/',
                        image: '/apollo.svg',
                    },
                ],
            },
        },
    },
];

describe('Home page', () => {
    it('should render without errors', async () => {
        render(<Home />, { mocks });

        // tools header
        expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();
        // array of tools
        expect(screen.getAllByRole('listitem').length).toEqual(tools.length);
        expect(screen.getAllByRole('link').length).toEqual(tools.length);

        const firstTool = screen.getAllByRole('listitem')[0];
        // Semantics check of 'link button' is anchor tag to tool page ( Accessibility test )
        expect(firstTool.querySelector('a')).toBeInTheDocument();
        // image
        expect(firstTool.querySelector('img')).toBeInTheDocument();
        // name
        // @ts-ignore
        waitFor(() => expect(firstTool.querySelector('p', { name: tools[0].name })).toBeInTheDocument());
    });
});
