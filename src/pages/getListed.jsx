import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import DarkPrimaryButton from '../atoms/darkPrimaryButton';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import InputForm from '../atoms/formInputs/InputForm';
import Radio from '../atoms/formInputs/Radio';
import TextArea from '../atoms/formInputs/TextArea';
import * as yup from 'yup';

import { useHistory } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const GetListed = (props) => {
  const [errors, setErrors] = useState({});
  const [otherCheckBox, setOtherCheckbox] = useState(false);
  const history = useHistory();

  let validationSchema = yup.object({
    email: yup.string().email().required(),
    discordUser: yup.string(),
    name: yup.string().required(),
    description: yup.string(),
    discordProject: yup.string().url(),
    twitter: yup
      .string()
      .matches(
        /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
        'invalid  url'
      )
      .required(),
    website: yup.string().url(),
    openSea: yup
      .string()
      .matches(
        /http(?:s)?:\/\/(?:www\.)?opensea\.io\/([a-zA-Z0-9_]+)/,
        'invalid url'
      )
      .required(),
    status: yup.string().required(),
    address: yup.string().required(),
    fee: yup.string().required(),
    extra: yup.string(),
  });

  return (
    <div className='get-listed-container'>
      <div className='get-listed-header'>
        <h1>Get your project featured</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          discordUser: '',
          name: '',
          description: '',
          discordProject: '',
          twitter: '',
          website: '',
          openSea: '',
          status: '',
          dropDate: '',
          releaseDate: '',
          address: '',
          fee: '',
          extra: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
          toast.success('Successfully submission', { hideProgressBar: true });

          history.push('/');
        }}
      >
        {({ errors, setFieldValue, values }) => {
          return (
            <Form>
              <div className='form-group'>
                <InputForm
                  label="What's your email?"
                  name='email'
                  className='get-listed-input'
                  labelClassName='get-listed-label required'
                  type='email'
                  placeholder='Enter email'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label=" What's your Discord username? (with #)"
                  name='discordUser'
                  className='get-listed-input'
                  labelClassName='get-listed-label'
                  type='text'
                  placeholder='Discord user'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label='Project name'
                  name='name'
                  className='get-listed-input'
                  labelClassName='get-listed-label required'
                  type='text'
                  placeholder='Project name'
                />
              </div>
              <div className='form-group'>
                <TextArea
                  label='Project description'
                  name='description'
                  className='get-listed-input'
                  labelClassName='get-listed-label'
                  rows='5'
                  placeholder='Project description'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label='Project discord URL'
                  name='discordProject'
                  className='get-listed-input'
                  labelClassName='get-listed-label'
                  type='text'
                  placeholder='Project discord URL'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label='Project Twitter URL'
                  name='twitter'
                  className='get-listed-input'
                  labelClassName='get-listed-label required'
                  type='text'
                  placeholder='Project Twitter URL'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label='Project Website URL'
                  name='website'
                  className='get-listed-input'
                  labelClassName='get-listed-label '
                  type='text'
                  placeholder='Project website URL'
                />
              </div>
              <div className='form-group'>
                <InputForm
                  label='Project OpenSea URL'
                  name='openSea'
                  className='get-listed-input'
                  labelClassName='get-listed-label required'
                  type='text'
                  placeholder='Project openSea URL'
                />
              </div>

              {/* radio */}
              <div className='form-group'>
                <label className='get-listed-label required'>
                  What's the status of your project?
                </label>
                <Radio
                  name='status'
                  className='form-check-input'
                  label=' Sale is upcomin'
                  labelClassName='form-check-label'
                  value='Sale is upcoming'
                  containerClassname='form-check'
                />
                <Radio
                  name='status'
                  className='form-check-input'
                  label='Sale is ongoing (not all items have been minted/revealed)'
                  labelClassName='form-check-label'
                  value='Sale is ongoing (not all items have been minted/revealed)'
                  containerClassname='form-check'
                />
                <Radio
                  name='status'
                  className='form-check-input'
                  label='Sale is completed (All NFTs are minted/revealed)'
                  labelClassName='form-check-label'
                  value='Sale is completed (All NFTs are minted/revealed)'
                  containerClassname='form-check'
                />
                <small className='text-danger'>{errors.status}</small>
              </div>

              <div className='form-group project-dates'>
                <div className='picker'>
                  <label
                    htmlFor='get-listed-project-opensea-url'
                    className='get-listed-label'
                  >
                    What's your project drop date?
                  </label>
                  <DatePicker
                    className='date-picker'
                    name='dropDate'
                    value={values.dropDate && new Date(values.dropDate)}
                    onChange={(date) => setFieldValue('dropDate', date)}
                  />
                </div>

                <div className='picker'>
                  <label className='get-listed-label'>
                    What's your project reveal date?
                  </label>
                  <DatePicker
                    className='date-picker'
                    name='releaseDate'
                    value={values.releaseDate && new Date(values.releaseDate)}
                    onChange={(date) => setFieldValue('releaseDate', date)}
                  />
                </div>
              </div>

              <div className='form-group'>
                <InputForm
                  label=" What's your project contract address?"
                  name='address'
                  className='get-listed-input'
                  labelClassName='get-listed-label required'
                  type='text'
                  placeholder='Project Contract Address'
                />
              </div>

              {/* radio */}
              <div className='form-group'>
                <label className='get-listed-label required'>
                  Are you OK paying a small fee to get listed?
                </label>
                <Radio
                  name='fee'
                  className='form-check-input'
                  label='Yes'
                  labelClassName='form-check-label'
                  value='yes'
                  containerClassname='form-check'
                />
                <Radio
                  name='fee'
                  className='form-check-input'
                  label='No'
                  labelClassName='form-check-label'
                  value='no'
                  containerClassname='form-check'
                />

                <small className='text-danger'>{errors.fee}</small>
              </div>

              {/* radio end */}

              <div className='form-group'>
                <InputForm
                  label='   Anything you would like to add?'
                  name='extra'
                  className='get-listed-input'
                  labelClassName='get-listed-label'
                  type='text'
                />
              </div>
              <DarkPrimaryButton type='submit' className='get-listed-submit'>
                Submit
              </DarkPrimaryButton>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default GetListed;
