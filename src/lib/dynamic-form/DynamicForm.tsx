import React, { ReactElement } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from './util/form-generator/form';
import Input from '../../components/input/Input';
import { FixMeType } from '../../type/fix-me.type';
import Button from '../../components/button/Button';
import Select from '../../components/select/Select';
import DateSelect from '../../components/dateSelect/DateSelect';

interface DynamicFormProp {
  form: Form;
  onSubmit: (data: FixMeType) => void;
  inputWrapper?: FixMeType;
}

const DynamicForm = (props: DynamicFormProp): ReactElement => {
  const { form, onSubmit } = props;
  const {
    register, handleSubmit, errors, setValue, watch, control,
  } = useForm({
    validationSchema: form.getValidationSchema(),
    defaultValues: form.getDefaultValues(),
    reValidateMode: 'onChange',
  });
  const { t, i18n } = useTranslation();

  const fields = form.getFieldsArray();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="container bg-gray-200 p-5 mb-5 rounded">
          {fields.map(([name, field]) => {
            let component = null;
            field.setValueFn = setValue;
            field.watchFn = watch;
            if (field.isInputElement()) {
              component = (
                <React.Fragment key={field.id}>
                  <Input
                    label={t(field.label)}
                    name={name}
                    type={field.type}
                    placeholder={field.placeholder}
                    tooltip={field.tooltip}
                    disabled={field.disabled}
                    autoFocus={field.autoFocus}
                    spellCheck={field.spellCheck}
                    autoComplete={field.autoComplete ? 'on' : 'off'}
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

            if (field.isDateType()) {
              component = (
                <React.Fragment key={field.id}>
                  <DateSelect
                    control={control}
                    name={name}
                    options={field.options as {}[]}
                    label={field.label}
                    minDate={field.dateParams?.minDate}
                    maxDate={field.dateParams?.maxDate}
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

            if (field.isSelectType()) {
              component = (
                <React.Fragment key={field.id}>
                  <Select
                    control={control}
                    name={name}
                    options={field.options as {}[]}
                    label={field.label}
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

            if (field.visible) {
              return component;
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
