import * as fromAppComponent from './comp1.component.actions';

describe('fromAppComponent', () => {
  it('should return an action', () => {
    expect(fromAppComponent.increment().type).toBe('[AppComponent] Increment');
  });
});
