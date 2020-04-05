import * as fromAppComponent from './app.component.actions';

describe('fromAppComponent', () => {
  it('should return an action', () => {
    expect(fromAppComponent.increment().type).toBe('[AppComponent] Increment');
  });
});
