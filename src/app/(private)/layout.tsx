import { Fragment } from 'react';

import { auth } from '@lib/auth';

import Header from '@components/common/Header';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <Fragment>
      <Header
        id={session?.user.id || null}
        name={session?.user.name || ''}
        imageUrl={session?.user.image || ''}
      />
      {children}
    </Fragment>
  );
}
