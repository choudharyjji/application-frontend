import React, { ReactElement } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
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
}

const DynamicForm = (props: DynamicFormProp): ReactElement => {
  const { form, onSubmit, defaultValues } = props;
  const formDefaultValues = defaultValues || form.getDefaultValues();
  const {
    register, handleSubmit, errors, control,
  } = useForm({
    validationSchema: form.getValidationSchema(),
    defaultValues: formDefaultValues,
    reValidateMode: 'onChange',
  });
  const { t } = useTranslation();

  const fields = form.getFieldsArray();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="container bg-fiesta-light-gray p-5 mb-5 rounded-lg">
          {fields.map(([name, field]) => {
            field.setControl(control);
            let component = null;
            if (field.isInputElement() && field instanceof InputField) {
              const ComponentTypeWrapper = field.isCheckboxType() ? Checkbox : Input;
              component = (
                <React.Fragment key={field.getId()}>
                  <ComponentTypeWrapper
                    label={t(field.getLabel())}
                    name={name}
                    type={field.getType()}
                    placeholder={field.getPlaceHolder()}
                    tooltip={field.getHelperMessage()}
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
                  <ErrorMessage errors={errors} name={name} as="p" />
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
                  <ErrorMessage errors={errors} name={name} as="p" />
                </React.Fragment>
              );
            }

            if (field.isSelectType() && field instanceof SelectField) {
              component = (
                <React.Fragment key={field.getId()}>
                  <Select
                    control={control}
                    name={name}
                    options={field.getOptions()}
                    label={t(field.getLabel())}
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
                  <ErrorMessage errors={errors} name={name} as="p" />
                </React.Fragment>
              );
            }

            if (field.isVisible()) {
              return <div className="mb-6" key={field.getId()}>{component}</div>;
            }
            return null;
          })}
        </div>
        <Button label="Save" type="submit" />
      </form>
    </>
  );
};

export default DynamicForm;
