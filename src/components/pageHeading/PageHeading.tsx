import React, { ReactElement } from 'react';

type PageHeadingProps = {
  value: string;
};

const PageHeading = (props: PageHeadingProps): ReactElement => (
  <h2 className="text-center text-3xl font-extrabold text-fiesta-dark-blue mb-1 xl:text-4xl">{props.value}</h2>);

export default PageHeading;
