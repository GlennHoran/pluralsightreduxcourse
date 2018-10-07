import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { expect } from '../../../helpers/chaiSetup';
import ReferralFormContainer from '../../../../src/app/ReferralForm/containers/ReferralFormContainer';
import users from '../../../../src/app/ReferralForm/reducers/UsersReducer';
import specialties from '../../../../src/app/ReferralForm/reducers/SpecialtiesReducer';
import referralReducer from '../../../../src/app/ReferralForm/reducers/ReferralReducer';
import systemUser from '../../../../src/app/reducers/SystemUserReducer';

describe('ReferralForm Integration Tests', () => {

  let wrapper;
  let store;
  const middlewares = [];
  middlewares.push(thunk);

  beforeEach(() => {
    store = createStore(combineReducers(
      {
        specialties,
        referral: referralReducer,
        form: formReducer,
        users,
        systemUser,
      }),
      compose(
        applyMiddleware(...middlewares)
      ));

    const props = {
      providerInfoAvail: 'false',
      match: {
        params: {}
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <ReferralFormContainer {...props} />
      </Provider>,
    );
  });

  it('renders no errors', () => {
    expect(wrapper.find('.error')).length(0);
  });

  it('renders Claimant Name error', () => {
    expect(wrapper.find('[id="claimantNameError"]')).length(0);
    wrapper.find('#claimantName').first().simulate('blur');
    expect(wrapper.find('[id="claimantNameError"]')).length(1);
    expect(wrapper.find('[id="claimantNameError"]').text()).equal('This field is required.');
  });

  it('renders claim number error', () => {
    expect(wrapper.find('#claimNumberError')).length(0);
    wrapper.find('#claimNumber').first().simulate('blur');
    expect(wrapper.find('#claimNumberError')).length(1);
    expect(wrapper.find('[id="claimNumberError"]').text()).equal('This field is required.');
  });

  it('renders the product type dropdown correctly', () => {
    const optionList = ['STD', 'LTD', 'STAT', 'STDCP', 'LTDCP', 'HOSPI'];
    optionList.forEach((option) => {
      expect(wrapper.find(`option[value="${option}"]`)).length(1);
    });
  });

  it('renders the time zone dropdown correctly', () => {
    const optionList = ['CST', 'MST', 'PST', 'EST'];
    optionList.forEach((option) => {
      expect(wrapper.find(`option[value="${option}"]`)).length(1);
    });
  });

  it('renders all spans when submit on form is forced with no inputs on any fields', () => {
    const form = wrapper.find('form').at(0);
    form.simulate('submit');
    expect(wrapper.find('span')).length(14);
  });

  it('renders no errors on initial form submit', () => {
    const form = wrapper.find('form').at(0);
    const claimantNameInput = wrapper.find('[name="claimantName"]').first();
    const customerNameInput = wrapper.find('[name="customerName"]').first();
    const claimantDOBInput = wrapper.find('[name="claimantDOB"]').first();
    const providerInfoAvailInd = wrapper.find('[name="providerInfoAvailInd"]').first();
    const claimantTimeZoneSelect = wrapper.find('[name="claimantTimeZone"]').first();
    const claimNumberInput = wrapper.find('[name="claimNumber"]').first();
    const productTypeSelect = wrapper.find('[name="productType"]').first();
    const referralTypeSelect = wrapper.find('[name="referralType"]').first();
    const lastDateWorked = wrapper.find('[name="lastDateWorked"]').first();

    claimNumberInput.simulate('change', { target: { value: '12345' } });
    claimantNameInput.simulate('change', { target: { value: 'Joe' } });
    productTypeSelect.simulate('change', { target: { value: 'STD' } });
    referralTypeSelect.simulate('change', { target: { value: 'ADD' } });
    claimantDOBInput.simulate('change', { target: { value: '2018-06-02' } });
    claimantTimeZoneSelect.simulate('change', { target: { value: 'Central' } });
    customerNameInput.simulate('change', { target: { value: 'Nike' } });
    lastDateWorked.simulate('change', { target: { value: '2018-06-02' } });
    providerInfoAvailInd.simulate('change', { target: { value: 'true' } });

    form.simulate('submit');
    expect(wrapper.find('.error')).length(0);
  });
});
