import React, { ReactElement } from 'react';

type PageDescriptionProps = {
  value: string;
};

const PageDescription = (props: PageDescriptionProps): ReactElement => (
  <p className="text-center text-l font-medium text-fiesta-cyan">{props.value}</p>);

export default PageDescription;
