import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../src/Recipe';
import { mount } from 'enzyme';
import sinon from 'sinon';


it('Should throw when renders without React Router', () => {
    const div = document.createElement('div');
    expect(() => ReactDOM.render(<Recipe />, div))
        .toThrow('need to be created with React Router to provide {match} props');
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    ReactDOM.render(<Recipe {...props} />, div);
});

it('should fetch correct json from server', () => {

    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    sinon.spy(window, 'fetch');
    const wrapper = mount(<Recipe {...props} />);
    expect(window.fetch.calledOnce).toEqual(true);
    expect(window.fetch.getCall(0).args[0]).toEqual('/recipes/dummy recipe.json');
    window.fetch.restore();
});

it('should show Sorry message if recipe not existed', (done) => {
    const props = {
        'match': {
            'params': {
                'name': 'recipe that do not existed'
            }
        }
    };
    let fetchStub = sinon.stub(window, 'fetch');
    fetchStub.returns(Promise.resolve(new Response('', {
        status: 404,
        headers: new Headers([])
    })));

    const recipe = mount(<Recipe {...props} />);

    /**
     * Testing Async inside componentDidMount...
     * maybe we could inject a callback when design API next time.
     * even process.nextTick could be a problem....
     */
    setTimeout(() => {
        expect(recipe.node.state.notFound).toEqual(true);
        expect(recipe.text()).toEqual('Sorry, this recipe doesn\'t exist or may have been removed');
        done();
    }, 100);

    fetchStub.restore();
});

it('should show Loading Recipe when waiting for server response', () => {
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    var server = sinon.fakeServer.create();
    server.respondWith('');
    const recipe = mount(<Recipe {...props} />);
    /* never respond */
    expect(recipe.text()).toEqual('Loading Recipe....');
    server.restore();
});

it('should show cooking time', () => {
    const recipeJson = {
        'cookingTimeInMinutes': 60,
        'imageUrl': '',
        'ingredients': []
    };
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    const recipe = mount(<Recipe {...props} />);
    recipe.setState({
        'recipe': recipeJson
    });
    expect(recipe.find('.content').text()).toEqual('Cooking Time:60 minutes');

});

it('should show image', () => {
    const recipeJson = {
        'cookingTimeInMinutes': 0,
        'imageUrl': '/data/images/abc.jpg',
        'ingredients': []
    };
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    const recipe = mount(<Recipe {...props} />);
    recipe.setState({
        'recipe': recipeJson
    });

    expect(recipe.find('img').node.src).toEqual('http://localhost/data/images/abc.jpg');
});

it('should show name', () => {
    const recipeJson = {
        'cookingTimeInMinutes': 0,
        'imageUrl': '',
        'ingredients': []
    };
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    const recipe = mount(<Recipe {...props} />);
    recipe.setState({
        'recipe': recipeJson
    });

    expect(recipe.find('h1').text()).toEqual('dummy recipe');


});

it('should show ingredients', () => {
    const recipeJson = {
        'ingredients': [
            {
                'name': 'sugar',
                'quantity': '1 tsp'
            },
            {
                'name': 'salt',
                'quantity': '1 tsp'
            }
        ]
    };
    const props = {
        'match': {
            'params': {
                'name': 'dummy recipe'
            }
        }
    };
    const recipe = mount(<Recipe {...props} />);
    recipe.setState({
        'recipe': recipeJson
    });

    expect(recipe.find('li').at(0).text()).toEqual('1 tsp sugar');
    expect(recipe.find('li').at(1).text()).toEqual('1 tsp salt');
});
