import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../components/input/Input';
import { FixMeType } from '../../type/fix-me.type';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import DateSelect from '../../components/dateSelect/DateSelect';
import Checkbox from '../../components/checkbox/Checkbox';
import { Form } from './util/Form';
import { DateField } from './util/DateField';
import { SelectField } from './util/SelectField';
import { InputField } from './util/InputField';

interface DynamicFormProp {
  form: Form;
  onSubmit: (data: FixMeType) => void;
  defaultValues?: Record<string, any>;
  inputWrapper?: FixMeType;
  buttonTitle?: string;
  buttonGroup?: FixMeType;
}

const DynamicForm = (props: DynamicFormProp): ReactElement => {
  const { t } = useTranslation();
  const {
    form, onSubmit, defaultValues, buttonTitle, buttonGroup,
  } = props;
  const formDefaultValues = defaultValues || form.getDefaultValues();
  const {
    register, handleSubmit, errors, control,
  } = useForm({
    validationSchema: form.getValidationSchema(),
    defaultValues: formDefaultValues,
    reValidateMode: 'onChange',
  });

  const fields = form.getFieldsArray();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="container bg-fiesta-light-gray p-5 mb-5 rounded-lg">
          {fields.map(([name, field]) => {
            field.setControl(control);
            let component = null;
            const fieldError = errors[name];
            const error: string = fieldError && fieldError.message ? fieldError.message : '';

            if (field.isInputElement() && field instanceof InputField) {
              const ComponentTypeWrapper = field.isCheckboxType() ? Checkbox : Input;
              component = (
                <React.Fragment key={field.getId()}>
                  <ComponentTypeWrapper
                    label={t(field.getLabel())}
                    name={name}
                    type={field.getType()}
                    prefix={field.getPrefix()}
                    placeholder={field.getPlaceHolder()}
                    tooltip={t(field.getHelperMessage() || '')}
                    disabled={field.isDisabled()}
                    autoFocus={field.getAutoFocus()}
                    spellCheck={field.getSpellCheck()}
                    autoComplete={field.getAutoComplete() ? 'on' : 'off'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                      field.onChangeCallback(event);
                    }}
                    onBlur={(event): void => {
                      field.onBlurCallback(event);
                    }}
                    onFocus={(event): void => {
                      field.onFocusCallback(event);
                    }}
                    innerRef={register}
                  />
                </React.Fragment>
              );
            }

            if (field.isDateType() && field instanceof DateField) {
              component = (
                <React.Fragment key={field.getId()}>
                  <DateSelect
                    control={control}
                    name={name}
                    label={t(field.getLabel())}
                    tooltip={t(field.getHelperMessage() || '')}
                    minDate={field.getMinDate() || undefined}
                    maxDate={field.getMaxDate() || undefined}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                      field.onChangeCallback(event);
                    }}
                    onBlur={(event): void => {
                      field.onBlurCallback(event);
                    }}
                    onFocus={(event): void => {
                      field.onFocusCallback(event);
                    }}
                    innerRef={register}
                  />
                </React.Fragment>
              );
            }

            if (field.isSelectType() && field instanceof SelectField) {
              const options = field.getOptions().map((option) => ({ label: t(option.label), value: option.value }));

              component = (
                <React.Fragment key={field.getId()}>
                  <Select
                    control={control}
                    name={name}
                    options={options}
                    label={t(field.getLabel())}
                    tooltip={t(field.getHelperMessage() || '')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                      field.onChangeCallback(event);
                    }}
                    onBlur={(event): void => {
                      field.onBlurCallback(event);
                    }}
                    onFocus={(event): void => {
                      field.onFocusCallback(event);
                    }}
                    innerRef={register}
                  />
                </React.Fragment>
              );
            }
            if (field.isVisible()) {
              return (
                <div className="mb-6" key={field.getId()}>
                  {component}
                  <p className="text-fiesta-red text-xs pt-1">{t(error)}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
        {buttonGroup
          ? (
            <div className="inline-flex">
              {buttonGroup}
            </div>
          )
          : (<Button label={buttonTitle || 'Submit'} color="blue" type="submit" />)}

      </form>
    </>
  );
};

export default DynamicForm;
