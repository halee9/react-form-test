import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  required, minLength, maxLength, number, phoneNumber
} from 'hs-react-form';

import { withForm, InputPhoneNumberWithCountry } from 'hs-react-form';

const categoriesArray = [ "Grocery", "Beverage", "Stationary", "Others" ];

const rules = {
  name: [required("Name is required."), minLength(5)(), maxLength(20)()],
  // set false at first index if the field is optional.
  description: [false, minLength(5)()],
  price: [required(), number()],
  onoff: [required()],
  category: [required()],
  countryCode: [false],
  phoneNumber: [required(), minLength(6)()],
}

const conditionalRules = {
  name: ["description", (value) => {
    if (value.length > 7){
      return [required(), minLength(5)()];
    }
    else return [false, minLength(5)()];
  }]
}

const fetchData = ms => new Promise(resolve => setTimeout(() => {
  resolve({
    name: "Test",
    description: "description asfdf",
    price: 9.99,
    category: "Others"
  });
}, ms))

class FormLevelSample extends Component {

  handleSubmit = (e) => {
    this.props.handleSubmit(e, (res) => {
      if (res) {
        alert("Form will be submitted!!");
      }
      else {
        for (const key in this.props.validFields){
          if (!this.props.validFields[key]){
            if (this[key].focus) this[key].focus();
            break;
          }
        }
      }
    });
    
  }

  componentDidMount(){
    const { values, ruleChanged } = this.props;
    ruleChanged(conditionalRules);

    const { params } = this.props.match;
    if (params.id) {
      fetchData(3000).then((data) => {
        this.props.handleFetchedData(data);
      });
    }
  }

  render() {
    const { handleChange, handleBlur, handleSubmit, values, errors, validForm, ruleChanged } = this.props;
    return (
      <div>
        <h3>Form Level Validation Sample with HOC</h3>
        <Link className='pull-right' to='/formSample2/11'>Fetch data</Link>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              name='name'
              placeholder='Name of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name || ''}
              ref={(input) => { this.name = input; }}
            /> 
            <div className='text-danger'>{errors.name}</div>      
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              name='description'
              placeholder='Description of item (optional)'
              className='form-control'
              rows='4'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description || ''}
              ref={(input) => { this.description = input; }}
            /> 
            <div className='text-danger'>{errors.description}</div>           
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              name='price'
              type='text'
              placeholder='Price of item'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price || ''}
              ref={(input) => { this.price = input; }}
            />
            <div className='text-danger'>{errors.price}</div>
          </div>

          <div className="form-group">
            <label>On Off button: </label>
            <br />
            <label className="radio-inline">
              <input
                name='onoff'
                type='radio'
                onChange={handleChange}
                onBlur={handleBlur}
                value={'on'}
              /> on
            </label>
            <label className="radio-inline">
              <input
                name='onoff'
                type='radio'
                onChange={handleChange}
                onBlur={handleBlur}
                value={'off'}
              /> off
            </label>
            <div className='text-danger'>{errors.price}</div>
          </div>

          <div className="form-group">
            <div>
              <label>Category: </label>
            </div>
            <select
              name='category'
              className='form-control'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.category || ''}
              ref={(input) => { this.category = input; }}
            >
              <option />
              { _.map(categoriesArray, value => {
                return (
                  <option 
                    key={value} 
                    value={value}
                  >
                    {value}
                  </option>
                )}
              )}
            </select>
            <div className='text-danger'>{errors.category}</div>
          </div>

          <div className="form-group">
            {/* <div>
              <label>Phone Number: </label>
            </div> */}
            <InputPhoneNumberWithCountry 
              countryLabel='Country Code: '
              phoneLabel='Phone Number: '
              countryName='countryCode'
              countryClassName='form-control'
              inputName='phoneNumber'
              inputClassName='form-control'
              onChangeInput={handleChange}
              onBlurInput={handleBlur}
              phoneMessage={errors.phoneNumber}
              ref={(input) => { this.phoneNumber = input; }}
            />
            <div className='text-danger'>{errors.phoneNumber}</div>
          </div>

          <div className="text-center">
            <button type="submit" 
              className="btn btn-primary" 
              disabled={!validForm}>Submit
            </button>
            {' '}
            <button type="submit" 
              className="btn btn-primary">Submit
            </button>
          </div>
          <hr/>
          <div><pre>{JSON.stringify(this.props, null, 2) }</pre></div>
        </form> 
            
      </div>
    );
  }
}

export default withForm(rules)(FormLevelSample);
